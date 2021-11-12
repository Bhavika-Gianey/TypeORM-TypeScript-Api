import {Router} from 'express';
import AuthController from "../controllers/AuthController";
import extractJWT from "../middlewares/extractJWT";


const router = Router();
// const k = new PostController();
router.get('/',AuthController.getUsers);
router.get('/me',extractJWT,AuthController.findUser );
router.post('/login',AuthController.login);
router.post('/register',AuthController.register);
router.put('/updateMe',extractJWT,AuthController.updateUser );
router.delete('/deleteMe',extractJWT,AuthController.deleteUser );
router.post('/renewJWT',AuthController.renewAccessToken);


export default router;
// module.exports = router;
