import { Request, Response, NextFunction } from "express";
import postService from "./post.service";

export class PostController {
  /**
   * @swagger
   * /api/v1/posts:
   *   post:
   *     summary: Create a new post
   *     description: Create a new blog post (requires authentication)
   *     tags: [Posts]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreatePostDto'
   *           example:
   *             title: "My First Blog Post"
   *             content: "This is the content of my first blog post..."
   *     responses:
   *       201:
   *         description: Post created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 201
   *                 data:
   *                   $ref: '#/components/schemas/Post'
   *                 message:
   *                   type: string
   *                   example: "Post created successfully"
   *       400:
   *         description: Bad request - Validation error
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  public createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const postData = req.body;
      const userId = (req as any).user.id;
      const result = await postService.createPost({
        ...postData,
        author: userId,
      });
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/posts:
   *   get:
   *     summary: Get all posts
   *     description: Retrieve a list of all blog posts with author information
   *     tags: [Posts]
   *     responses:
   *       200:
   *         description: Posts retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Post'
   *                 message:
   *                   type: string
   *                   example: "Posts retrieved successfully"
   *       500:
   *         description: Internal server error
   */
  public getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await postService.getAllPosts();
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   get:
   *     summary: Get post by ID
   *     description: Retrieve a specific blog post by its ID
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Post ID
   *         example: "507f1f77bcf86cd799439012"
   *     responses:
   *       200:
   *         description: Post retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 data:
   *                   $ref: '#/components/schemas/Post'
   *                 message:
   *                   type: string
   *                   example: "Post retrieved successfully"
   *       404:
   *         description: Post not found
   *       500:
   *         description: Internal server error
   */
  public getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await postService.getPostById(id as string);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   put:
   *     summary: Update post
   *     description: Update a blog post (only by the author)
   *     tags: [Posts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Post ID
   *         example: "507f1f77bcf86cd799439012"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdatePostDto'
   *           example:
   *             title: "Updated Blog Post Title"
   *             content: "Updated content of my blog post..."
   *     responses:
   *       200:
   *         description: Post updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 data:
   *                   $ref: '#/components/schemas/Post'
   *                 message:
   *                   type: string
   *                   example: "Post updated successfully"
   *       400:
   *         description: Bad request - Validation error
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Post not found or unauthorized
   *       500:
   *         description: Internal server error
   */
  public updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const userId = (req as any).user.id;
      const result = await postService.updatePost(
        id as string,
        updateData,
        userId as string
      );
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   delete:
   *     summary: Delete post
   *     description: Delete a blog post (only by the author)
   *     tags: [Posts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Post ID
   *         example: "507f1f77bcf86cd799439012"
   *     responses:
   *       200:
   *         description: Post deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 data:
   *                   type: object
   *                   properties:
   *                     deleted:
   *                       type: boolean
   *                       example: true
   *                 message:
   *                   type: string
   *                   example: "Post deleted successfully"
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Post not found or unauthorized
   *       500:
   *         description: Internal server error
   */
  public deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const result = await postService.deletePost(
        id as string,
        userId as string
      );
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/posts/user/{userId}:
   *   get:
   *     summary: Get user's posts
   *     description: Retrieve all posts by a specific user
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *         example: "507f1f77bcf86cd799439011"
   *     responses:
   *       200:
   *         description: User posts retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Post'
   *                 message:
   *                   type: string
   *                   example: "User posts retrieved successfully"
   *       500:
   *         description: Internal server error
   */
  public getUserPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const result = await postService.getUserPosts(userId as string);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };
}
