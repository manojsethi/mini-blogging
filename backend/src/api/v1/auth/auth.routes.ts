import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateDto } from '../../../middleware/validation';
import { RegisterDto } from '../../../dto/auth/register.dto';
import { LoginDto } from '../../../dto/auth/login.dto';

const router: Router = Router();
const authController = new AuthController();

router.post('/register', validateDto(RegisterDto), authController.register);
router.post('/login', validateDto(LoginDto), authController.login);
router.post('/logout', authController.logout);

export default router;
