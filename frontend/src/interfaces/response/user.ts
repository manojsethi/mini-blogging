import type { IBaseResponse } from "./base";

export interface IUserData {
    username:string;
    email:string;
    _id:string
}
export interface IUserResponse extends IBaseResponse {
    data:IUserData[];
}