import { Router } from 'express';
const router = Router();
import * as userController  from '../controllers/userController'
import {authJwt, verifySignup} from '../middlewares';


router.post('/',[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
],userController.createUser);

export default router;