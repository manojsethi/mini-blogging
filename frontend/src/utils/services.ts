import type { ILogin } from "../interfaces/request/login";
import type { IPost } from "../interfaces/request/post";
import type { ISignup } from "../interfaces/request/signup";
import type { IBaseResponse } from "../interfaces/response/base";
import type { ILoginResponse } from "../interfaces/response/login";
import type { IPostResponse } from "../interfaces/response/post";
import type {
  IUserListResponse,
  IUserResponse,
} from "../interfaces/response/user";
import axiosInstance from "./axiosInstance";

class Services {
  signup(values: ISignup): Promise<IBaseResponse> {
    return axiosInstance
      .post("/auth/register", values)
      .then((res) => res)
      .catch((err) => err.response.data);
  }

  login(values: ILogin): Promise<ILoginResponse> {
    return axiosInstance
      .post("/auth/login", values)
      .then((res) => res)
      .catch((err) => err.response.data);
  }

  createPost(values: IPost): Promise<IBaseResponse> {
    return axiosInstance
      .post("/posts", values)
      .then((res) => res)
      .catch((err) => err.response.data);
  }

  editPost(id: string, values: IPost): Promise<IBaseResponse> {
    return axiosInstance
      .put(`/posts/${id}`, values)
      .then((res) => res)
      .catch((err) => err.response.data);
  }

  getAllPosts(): Promise<IPostResponse> {
    return axiosInstance
      .get("/posts")
      .then((res) => res)
      .catch((err) => err.response.data);
  }

  getUser(id: string): Promise<IUserResponse> {
    return axiosInstance
      .get(`/users/${id}`)
      .then((res) => res)
      .catch((err) => err.response.data);
  }

  getAllUsers(): Promise<IUserListResponse> {
    return axiosInstance
      .get("/users")
      .then((res) => res)
      .catch((err) => err.response.data);
  }

  getUserBlogs(id: string): Promise<IPostResponse> {
    return axiosInstance
      .get(`/posts/user/${id}`)
      .then((res) => res)
      .catch((err) => err.response.data);
  }

  deleteBlog(id: string): Promise<IPostResponse> {
    return axiosInstance
      .delete(`/posts/${id}`)
      .then((res) => res)
      .catch((err) => err.response.data);
  }
}

export default new Services();
