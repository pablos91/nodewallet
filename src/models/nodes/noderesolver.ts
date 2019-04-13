import { FullNodeConfig } from "../fullNode";
import { AxiosRequestConfig } from "axios";
import { FullNode } from "./node";
import { Bitcoin } from "./bitcoin";
import { Litecoin } from "./litecoin";

export class NodeResolver {
    constructor(node: FullNodeConfig) {
        this.config = {
            baseURL: node.url,
            auth: {
                username: node.rpcuser,
                password: node.rpcpassword
            }
        };

        switch(node.type) {
            case "bitcoin":
                this.node = new Bitcoin();
            case "litecoin":
                this.node = new Litecoin();
            default:
                void(0);
        }
    }

    config: AxiosRequestConfig;
    node: FullNode;
}