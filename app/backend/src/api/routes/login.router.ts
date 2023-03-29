import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import validateLogin from '../middlewares/ValidateLogin';
import AuthMiddleware from '../middlewares/Auth';

const router = Router();

const loginController = new LoginController();

router.get('/role', AuthMiddleware, loginController.loginWithRole);
router.post('/', validateLogin, loginController.login);

export default router;
