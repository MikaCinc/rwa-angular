export interface IServerResponse<T> {
    success: boolean;
    data: T | null;

    statusCode?: number,
    message?: string,// | string[],
    error?: string
};