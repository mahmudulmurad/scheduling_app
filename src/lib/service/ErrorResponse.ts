import { ErrorResponse } from "../interface/Response.interface";

export const errorResponse = (msg: string): ErrorResponse => ({
    status: false,
    msg,
  });