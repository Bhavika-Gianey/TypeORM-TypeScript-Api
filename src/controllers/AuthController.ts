import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const SECRET = 'secret';
class AuthController {
  static login = async (request: Request, res: Response) => {
    const { email, password } = request.body;
    if (!(email && password)) {
      res.status(400).send("Please enter email and password");
    }
    let user = await getRepository(User).findOne({ email: email });
    if (!user) {
      res.status(400).send("User does not exist");
      return;
    }
    const match = await AuthController.validatePassword(request.body.password, user.password);
    // console.log(match);

    if (!match) {
      res.status(401).send("Incorrect Password");
      return;
    }
    // console.log(user);
    let accessToken = AuthController.generateJWT(user.email) ;
    let refreshToken = AuthController.refreshJWT(user.email) ;

    res.status(200).json({
      user,
      "JWT_acess_token": accessToken,
      "JWT_refresh_token": refreshToken

  })
}

  static register = (request: Request, response: Response) => {
    try {
      const newUser = {
        name: request.body.name,
        email: request.body.email,
        password: (request.body.password)
      };
      bcrypt.hash(newUser.password, 10, async function(err, hash) {
        if (err) throw err;
        newUser.password = hash;
        const user = getRepository(User).create(newUser)
        const result = await getRepository(User).save(user);
        return response.json(result);
      })
    } catch (error) {
      console.log("oops ", error);
      return (error);
    }
  }

  static getUsers = async (req: Request, res: Response) => {
    const result = await getRepository(User).find();
    return res.json(result);
  }

  static renewAccessToken  =  async (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    if(!refreshToken){
      return res.status(403).json({
        message : "User not authorized"
      });
    }

    jwt.verify(refreshToken, "refresh", (err:any,decoded:any)=>{
        if(err){
          return res.status(404).json({
            message: err.message,
            err
          });
        }
        else{
          const accessToken = AuthController.generateJWT(decoded.email) ;
          return res.status(201).json({
            "decoded": decoded["email"],
            accessToken
          })
        }
    });
  }

  static validatePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
  }

  static generateJWT = (email: string) => {
    return jwt.sign({
      email : email
    },
    SECRET,
    { expiresIn: '80s' });
  }

  static refreshJWT = (email: string) => {
    return jwt.sign({
      email : email
    },
    "refresh",
    { expiresIn: '7d' });
  }


  static findUser = async(request: Request, response: Response) => {
    try {
      const user = await getRepository(User).findOne({email : response.locals.jwt['email']});
      return response.json(user);
    } catch (error) {
      return (error);
    }
  }

  static updateUser = async(req: Request, res: Response) => {
    const user = await getRepository(User).findOne({email : res.locals.jwt['email']});
    // return res.json(task);
    if(user){
      getRepository(User).merge(user, req.body);
      const result = await getRepository(User).save(user);
      return res.json(result);
    }
     return res.json({ msg: "User Not Found" });
  }

  static deleteUser = async(req: Request, res: Response) => {
    let user = await getRepository(User).findOne({email : res.locals.jwt['email']});
    // return res.json(task);
    if(user){
      const duser = await getRepository(User).delete(req.params.id);
      return res.json(duser);
    }
     return res.json({ msg: "User Not Found" });
  }

}



export default AuthController;
