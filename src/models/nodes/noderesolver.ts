import { FullNodeConfig } from "../fullNodeConfig";
import { AxiosRequestConfig } from "axios";
import { FullNode } from "./node";
import { Bitcoin } from "./bitcoin";
import { RPCResponse } from "../rpcresponse";

export const NodeResolver = (node: FullNodeConfig) : FullNode => {

    switch (node.type) {
        case "bitcoin":
            return new Bitcoin(node);
        default:
            return void (0);
    }

}