import type { IBaseResponse } from "./base"
import type { IUserData } from "./user"

export interface ILoginResponse extends IBaseResponse {
  data: ILoginResponseData
}

export interface ILoginResponseData {
  user: IUserData
  refreshToken: string
  accessToken: string
}

