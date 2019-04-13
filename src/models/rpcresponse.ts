export interface RPCResponse {
    result?: any;
    error?: RPCResponseError;
    id?: number;
}

export interface RPCResponseError {
    code?: number;
    message?: string;
}