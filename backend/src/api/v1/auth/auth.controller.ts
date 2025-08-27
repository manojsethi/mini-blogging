import { Request, Response, NextFunction } from "express";
import authService from "./auth.service";
import HttpStatusCode from "http-status-codes";

export class AuthController {
  /**
   * @swagger
   * /api/v1/auth/register:
   *   post:
   *     summary: Register a new user
   *     description: Create a new user account with email, username, and password
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterDto'
   *           example:
   *             username: "john_doe"
   *             email: "john@example.com"
   *             password: "Password123"
   *     responses:
   *       201:
   *         description: User registered successfully
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
   *                   type: object
   *                   properties:
   *                     user:
   *                       $ref: '#/components/schemas/User'
   *                     accessToken:
   *                       type: string
   *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *                     refreshToken:
   *                       type: string
   *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *                 message:
   *                   type: string
   *                   example: "User registered successfully"
   *       400:
   *         description: Bad request - User already exists or validation error
   *       500:
   *         description: Internal server error
   */
  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData = req.body;
      const result = await authService.register(userData);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/auth/login:
   *   post:
   *     summary: User login
   *     description: Authenticate user with email and password
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginDto'
   *           example:
   *             email: "john@example.com"
   *             password: "Password123"
   *     responses:
   *       200:
   *         description: User logged in successfully
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
   *                     user:
   *                       $ref: '#/components/schemas/User'
   *                     accessToken:
   *                       type: string
   *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *                     refreshToken:
   *                       type: string
   *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *                 message:
   *                   type: string
   *                   example: "User logged in successfully"
   *       400:
   *         description: Bad request - Invalid credentials
   *       500:
   *         description: Internal server error
   */
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/auth/logout:
   *   post:
   *     summary: User logout
   *     description: Logout user (client should discard tokens)
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User logged out successfully
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
   *                 message:
   *                   type: string
   *                   example: "Logged out successfully"
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  public logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.status(HttpStatusCode.OK).json({
        success: true,
        statusCode: HttpStatusCode.OK,
        message: "Logged out successfully"
      });
    } catch (error) {
      next(error);
    }
  };
}
