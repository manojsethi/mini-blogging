import { IUser, userModal } from "../../../entities/user.entity";
import {
  InternalServerException,
  NotFoundException,
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

export class UserService {
  public async getAllUsers(loggedInUser: IUser): Promise<ApiResponse> {
    try {
      const users = await userModal
        .find({ isDeleted: false, _id: { $ne: loggedInUser._id } })
        .select("-password");
      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: users,
        message: "Users retrieved successfully",
      };
    } catch (error) {
      throw new InternalServerException("Failed to fetch users");
    }
  }

  public async getUserById(id: string): Promise<ApiResponse> {
    try {
      const user = await userModal
        .findOne({ _id: id, isDeleted: false })
        .select("-password");

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: user,
        message: "User retrieved successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerException("Failed to fetch user");
    }
  }

  public async updateUser(id: string, updateData: any): Promise<ApiResponse> {
    try {
      const user = await userModal
        .findOneAndUpdate({ _id: id, isDeleted: false }, updateData, {
          new: true,
        })
        .select("-password");

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: user,
        message: "User updated successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerException("Failed to update user");
    }
  }

  public async deleteUser(id: string): Promise<ApiResponse> {
    try {
      const user = await userModal.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: { deleted: true },
        message: "User deleted successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerException("Failed to delete user");
    }
  }

  public async findByEmail(email: string): Promise<ApiResponse> {
    try {
      const user = await userModal
        .findOne({ email, isDeleted: false })
        .select("-password");

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: user,
        message: "User retrieved successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerException("Failed to find user by email");
    }
  }

  public async findByEmailWithPassword(email: string): Promise<ApiResponse> {
    try {
      const user = await userModal.findOne({ email, isDeleted: false });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: user,
        message: "User retrieved successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerException("Failed to find user by email");
    }
  }
}

export default new UserService();
