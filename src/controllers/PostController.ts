import {Request, Response } from 'express';
import {getRepository} from 'typeorm';
import {Todos} from '../entity/Todos';

class PostController {
    async createTodo(request: Request, response: Response) {
    const newTask = {
      title: request.body.title,
      description: request.body.description
    };
    try{
      const task = getRepository(Todos).create(newTask);
      const result = await getRepository(Todos).save(task);
      return response.json(result);
    }catch (error) {
      console.log("oops ",error);
      return(error);
    }
  };
  static getTodo = async (req: Request, res: Response) => {
    const result = await getRepository(Todos).find();
    return res.json(result);
  }
  static findOneTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await getRepository(Todos).findOne(id);
    return res.json(task);
  }
  static updateTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await getRepository(Todos).findOne(id);
    // return res.json(task);
    if(task){
      getRepository(Todos).merge(task, req.body);
      const result = await getRepository(Todos).save(task);
      return res.json(result);
    }
     return res.json({ msg: "Post Not Found" });
  }
  static deleteTodo = async (req: Request, res: Response) => {
    const post = await getRepository(Todos).delete(req.params.id);
    return res.json(post);
  };

}
export default PostController;
