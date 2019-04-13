import { RPCRequest } from "../rpcrequest";
import { AxiosPromise } from "axios";
import { RPCResponse } from "../rpcresponse";

export interface FullNode {
    getBalance: () => AxiosPromise<RPCResponse>;
}