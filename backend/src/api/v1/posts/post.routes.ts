import { Router } from 'express';
import { PostController } from './post.controller';
import { authMiddleware } from '../../../middleware/auth';
import { validateDto } from '../../../middleware/validation';
import { CreatePostDto } from '../../../dto/post/create-post.dto';
import { UpdatePostDto } from '../../../dto/post/update-post.dto';

const router: Router = Router();
const postController = new PostController();

router.post('/', authMiddleware, validateDto(CreatePostDto), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', authMiddleware, validateDto(UpdatePostDto), postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
router.get('/user/:userId', postController.getUserPosts);

export default router;
