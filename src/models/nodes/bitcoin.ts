import { RPCRequest } from "../rpcrequest";
import { FullNode } from "./node";

export class Bitcoin implements FullNode {
    getBalance = () => {
        return new RPCRequest("getbalance", [], 1);
    }
}