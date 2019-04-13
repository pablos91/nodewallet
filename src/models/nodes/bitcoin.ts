import { RPCRequest } from "../rpcrequest";
import { FullNode } from "./node";
import { FullNodeConfig } from "../fullNode";
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios";
import { RPCResponse } from "../rpcresponse";

export class Bitcoin implements FullNode {
    constructor(node:FullNodeConfig) {
        this.config = {
            baseURL: node.url,
            auth: {
                username: node.rpcuser,
                password: node.rpcpassword
            }
        };
    }

    private config: AxiosRequestConfig;

    getBalance = () => {
        return Axios.post('/', new RPCRequest("getbalance", [], 1), this.config) as AxiosPromise<RPCResponse>;
    }
}