import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import HttpStatusCode from "http-status-codes";

export const validateDto = (
  dtoClass: any,
  type: "body" | "query" | "params" = "body"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req[type]);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const validationErrors = errors.map((error) => ({
        field: error.property,
        constraints: error.constraints,
      }));

      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: {
          message: "Validation failed",
          details: validationErrors,
        },
      });
      return;
    }

    req[type] = dtoObject;
    next();
  };
};
