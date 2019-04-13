import { RPCRequest } from "../rpcrequest";

export interface FullNode {
    getBalance: () => RPCRequest;
}