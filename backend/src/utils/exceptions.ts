import HttpStatusCode from "http-status-codes";

export class InternalServerException extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.name = 'InternalServerException';
    this.statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.success = false;
  }
}

export class NotFoundException extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'NotFoundException';
    this.statusCode = HttpStatusCode.NOT_FOUND;
    this.message = message;
    this.success = false;
  }
}

export class BadRequestException extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(message: string = 'Bad Request') {
    super(message);
    this.name = 'BadRequestException';
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.success = false;
  }
}

export class UnauthorizedException extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedException';
    this.statusCode = HttpStatusCode.UNAUTHORIZED;
    this.success = false;
  }
}
