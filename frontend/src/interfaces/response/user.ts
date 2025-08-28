import type { IBaseResponse } from "./base";

export interface IUserData {
  username: string;
  email: string;
  id: string;
  _id: string;
}
export interface IUserListResponse extends IBaseResponse {
  data: IUserData[];
}

export interface IUserResponse extends IBaseResponse {
  data: IUserData
}
