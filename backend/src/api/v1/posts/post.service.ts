import { postModal } from "../../../entities/post.entity";
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

export class PostService {
  public async createPost(postData: any): Promise<ApiResponse> {
    try {
      const post = new postModal(postData);
      const savedPost = await post.save();

      return {
        success: true,
        statusCode: HttpStatusCode.CREATED,
        data: savedPost,
        message: "Post created successfully",
      };
    } catch (error) {
      throw new InternalServerException("Failed to create post");
    }
  }

  public async getAllPosts(): Promise<ApiResponse> {
    try {
      const posts = await postModal.find().populate("author", "username email");

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: posts,
        message: "Posts retrieved successfully",
      };
    } catch (error) {
      throw new InternalServerException("Failed to fetch posts");
    }
  }

  public async getPostById(id: string): Promise<ApiResponse> {
    try {
      const post = await postModal
        .findById(id)
        .populate("author", "username email");

      if (!post) {
        throw new NotFoundException("Post not found");
      }

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: post,
        message: "Post retrieved successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerException("Failed to fetch post");
    }
  }

  public async updatePost(
    id: string,
    updateData: any,
    userId: string
  ): Promise<ApiResponse> {
    try {
      const post = await postModal.findOne({ _id: id, author: userId });

      if (!post) {
        throw new NotFoundException("Post not found or unauthorized");
      }

      Object.assign(post, updateData);
      const updatedPost = await post.save();

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: updatedPost,
        message: "Post updated successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerException("Failed to update post");
    }
  }

  public async deletePost(id: string, userId: string): Promise<ApiResponse> {
    try {
      const post = await postModal.findOneAndDelete({
        _id: id,
        author: userId,
      });

      if (!post) {
        throw new NotFoundException("Post not found or unauthorized");
      }

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: { deleted: true },
        message: "Post deleted successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerException("Failed to delete post");
    }
  }

  public async getUserPosts(userId: string): Promise<ApiResponse> {
    try {
      const posts = await postModal
        .find({ author: userId })
        .populate("author", "username email");

      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        data: posts,
        message: "User posts retrieved successfully",
      };
    } catch (error) {
      throw new InternalServerException("Failed to fetch user posts");
    }
  }
}

export default new PostService();
