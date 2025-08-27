export interface IBaseResponse {
  error: IError;
  success: boolean;
  data?: any;
  statusCode?:number
}

interface IError {
  message: string;
}
