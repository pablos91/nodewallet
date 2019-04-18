import { FullNodeConfig } from "../fullNodeConfig";
import { AxiosRequestConfig } from "axios";
import { FullNode } from "./node";
import { Bitcoin } from "./bitcoin";
import { RPCResponse } from "../rpcresponse";
import { Litecoin } from "./litecoin";

export const NodeResolver = (node: FullNodeConfig) : FullNode => {

    switch (node.type) {
        case "bitcoin":
            return new Bitcoin(node);
        case "litecoin":
            return new Litecoin(node);
        default:
            return void (0);
    }

}