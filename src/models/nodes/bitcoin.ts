import { RPCRequest } from "../rpcrequest";
import { FullNode } from "./node";
import { FullNodeConfig } from "../fullNodeConfig";
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
        return new Promise<number>((resolve, reject)=>{
            Axios.post('/', new RPCRequest("getbalance", [], 1), this.config).then((resp:AxiosResponse<RPCResponse>)=>{
                if(resp.status == 200) {
                    resolve(resp.data.result);
                } else {
                    reject(resp.data.error);
                }
            });
        });
    }
}