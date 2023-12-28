export interface SuccessResponse<T> {
    status: boolean;
    payload: T;
    msg: string;
}

export interface ErrorResponse {
    status: boolean;
    msg: string;
}