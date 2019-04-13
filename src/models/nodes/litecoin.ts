import { RPCRequest } from "../rpcrequest";
import { FullNode } from "./node";

export class Litecoin implements FullNode {
    getBalance = () => {
        return new RPCRequest("getbalance", [], 1);
    }
}