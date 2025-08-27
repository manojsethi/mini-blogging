import type { ILogin } from "./login";

export interface ISignup extends ILogin {
    confirmPassword:string;
}