import type { IBaseResponse } from "./base"

export interface ILoginResponse extends IBaseResponse {
  data: ILoginResponseData
}

export interface ILoginResponseData {
  user: User
  refreshToken: string
  accessToken: string
}

export interface User {
  id: string
  email: string
  username: string
}
