import type { ILogin } from "../interfaces/request/login";
import type { ISignup } from "../interfaces/request/signup";
import type { IBaseResponse } from "../interfaces/response/base";
import type { ILoginResponse } from "../interfaces/response/login";
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

  createPost() {

  }
}

export default new Services();
