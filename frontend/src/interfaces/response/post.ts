import type { IBaseResponse } from "./base";
import type { IUserData } from "./user";

export interface IPostData {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author:IUserData
};

export interface IPostResponse extends IBaseResponse {
    data:IPostData[]
}