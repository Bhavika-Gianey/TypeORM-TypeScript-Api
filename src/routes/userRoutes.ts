import {Router} from 'express';
import PostController from "../controllers/PostController";


const router = Router();
const k = new PostController();
router.post('/', k.createTodo);
router.get('/',PostController.getTodo);
router.get('/:id',PostController.findOneTodo);
router.put('/:id',PostController.updateTodo);
router.delete('/:id',PostController.deleteTodo);
// export default router;
module.exports = router;
