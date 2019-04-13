import { FullNodeConfig } from "../fullNode";
import { AxiosRequestConfig } from "axios";
import { FullNode } from "./node";
import { Bitcoin } from "./bitcoin";
import { RPCResponse } from "../rpcresponse";

export const NodeResolver = (node: FullNodeConfig) => {

    switch (node.type) {
        case "bitcoin":
            return new Bitcoin<RPCResponse>(node);
        default:
            return void (0);
    }

}