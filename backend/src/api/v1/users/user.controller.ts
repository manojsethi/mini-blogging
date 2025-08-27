import { Request, Response, NextFunction } from "express";
import userService from "./user.service";

export class UserController {
  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     summary: Get all users
   *     description: Retrieve a list of all users (excluding deleted users)
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of users retrieved successfully
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
   *                     $ref: '#/components/schemas/User'
   *                 message:
   *                   type: string
   *                   example: "Users retrieved successfully"
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await userService.getAllUsers();
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     summary: Get user by ID
   *     description: Retrieve a specific user by their ID
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *         example: "507f1f77bcf86cd799439011"
   *     responses:
   *       200:
   *         description: User retrieved successfully
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
   *                   $ref: '#/components/schemas/User'
   *                 message:
   *                   type: string
   *                   example: "User retrieved successfully"
   *       404:
   *         description: User not found
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await userService.getUserById(id as string);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   put:
   *     summary: Update user
   *     description: Update a user's information
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *         example: "507f1f77bcf86cd799439011"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserDto'
   *     responses:
   *       200:
   *         description: User updated successfully
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
   *                   $ref: '#/components/schemas/User'
   *                 message:
   *                   type: string
   *                   example: "User updated successfully"
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await userService.updateUser(id as string, updateData);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Delete user
   *     description: Soft delete a user (mark as deleted)
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *         example: "507f1f77bcf86cd799439011"
   *     responses:
   *       200:
   *         description: User deleted successfully
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
   *                   example: "User deleted successfully"
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await userService.deleteUser(id as string);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };
}
