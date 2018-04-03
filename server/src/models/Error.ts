export interface IErrorApi {
    status?: number;
}

export class ErrorApi extends Error {
    public status?: number;
}