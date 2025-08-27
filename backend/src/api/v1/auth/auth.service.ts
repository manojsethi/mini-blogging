import { userModal } from "../../../entities/user.entity";
import { generateTokens } from "../../../utils/jwt";
import { hashPassword, comparePassword } from "../../../utils/password";
import {
  InternalServerException,
  BadRequestException,
} from "../../../utils/exceptions";
import HttpStatusCode from "http-status-codes";

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  data?: T;
  message?: string;
  error?: {
    message: string;
    details?: any;
  };
}

export class AuthService {
  public async register(userData: any): Promise<ApiResponse> {
    try {
      const existingUser = await userModal.findOne({ email: userData.email, isDeleted: false });
      if (existingUser) {
        throw new BadRequestException("User already exists");
      }

      const hashedPassword = await hashPassword(userData.password);
      const user = new userModal({
        ...userData,
        password: hashedPassword
      });

      const savedUser = await user.save();
      const tokens = generateTokens(savedUser._id as string);

      return {
        success: true,
        statusCode: HttpStatusCode.CREATED,
        data: {
          user: {
            id: savedUser._id,
            email: savedUser.email,
            username: savedUser.username
          },
          ...tokens
        },
        message: "User registered successfully"
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerException("Failed to register user");
    }
  }

  public async login(email: string, password: string): Promise<ApiResponse> {
    try {
      const user = await userModal.findOne({ email, isDeleted: false });
      if (!user) {
        throw new BadRequestException("Invalid credentials");
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException("Invalid credentials");
      }

      const tokens = generateTokens(user._id as string);

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: {
          user: {
            id: user._id,
            email: user.email,
            username: user.username
          },
          ...tokens
        },
        message: "User logged in successfully"
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerException("Failed to login user");
    }
  }
}

export default new AuthService();
