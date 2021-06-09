import { Router } from 'express';

const router = Router();
import {verifySignup} from '../middlewares';
import * as authController from '../controllers/authController'

router.post('/signup',[verifySignup.checkDuplicateUsernameOrEmail,verifySignup.checkRolesExisted], authController.signUp);
router.post('/signin', authController.signin);


export default router;