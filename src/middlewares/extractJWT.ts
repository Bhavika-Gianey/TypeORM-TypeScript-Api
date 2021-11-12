import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";


const SECRET = 'secret';

const extactJWT = (req: Request, res: Response, next:NextFunction) =>{
  console.log("validating Token");
  const authHeader =  req.headers['authorization'];
   let token = authHeader && authHeader.split(' ')[1];

  if(token){
    jwt.verify(token, SECRET, (err,decoded)=>{
        if(err){
          return res.status(404).json({
            message: err.message,
            err
          });
        }
        else{
          res.locals.jwt = decoded;
          console.log("jwt authorized");
          next();
        }
    });
  }
  else{
    return res.status(404).json({
      message: "Unauthorized, Please send the token"
    })
  }


};

export default extactJWT;
