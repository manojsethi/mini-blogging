import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../../middleware/auth';
import { validateDto } from '../../../middleware/validation';
import { UpdateUserDto } from '../../../dto/user/update-user.dto';

const router: Router = Router();
const userController = new UserController();

router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, validateDto(UpdateUserDto), userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

export default router;
