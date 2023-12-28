import { SuccessResponse } from "../interface/Response.interface";

export const successResponse = <T>(payload: T, msg: string, token?: string): SuccessResponse<T> => ({
    status: true,
    payload,
    msg,
    ...(token && { token }),
  });