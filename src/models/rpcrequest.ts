export class RPCRequest {

    constructor(method:string, params: any[], id: number) {
        this.method = method;
        this.params = params;
        this.id = id;
    }

    jsonrpc?: string = "2.0";
    method?: string = "";
    params?: any[] = [];
    id?: number;
}