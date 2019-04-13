import { RPCRequest } from "../rpcrequest";
import { FullNode } from "./node";
import { FullNodeConfig } from "../fullNodeConfig";
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios";
import { RPCResponse } from "../rpcresponse";
import _ = require("lodash");

export class Bitcoin implements FullNode {
    sendToAddress: (payload: import("../sendToAddressForm").SendToAddressForm) => Promise<string>;

    constructor(node: FullNodeConfig) {
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
        return new Promise<number>((resolve, reject) => {
            Axios.post('/', new RPCRequest("getbalance", [], 1), this.config).then((resp: AxiosResponse<RPCResponse>) => {
                if (resp.status == 200) {
                    resolve(resp.data.result);
                } else {
                    reject(resp.data.error);
                }
            })
        })
    }

    getAddresses = (label: string = "") => {
        return new Promise<string[]>((resolve, reject) => {
            Axios.post('/', new RPCRequest("getaddressesbylabel", [label], 1), this.config).then((resp: AxiosResponse<RPCResponse>) => {
                if (resp.status == 200) {
                    let addresses: string[] = [];
                    _.forOwn(resp.data.result, (v,k)=>addresses.push(k));
                    resolve(addresses);
                } else {
                    reject(resp.data.error);
                }
            })
        })
    };

    getLabels = () => {
        return new Promise<string[]>((resolve, reject) => {
            Axios.post('/', new RPCRequest("listlabels", [], 1), this.config).then((resp: AxiosResponse<RPCResponse>) => {
                if (resp.status == 200) {
                    resolve(resp.data.result);
                } else {
                    reject(resp.data.error);
                }
            })
        })
    };

    unlockWallet = (passphrase:string) => {
        return new Promise<boolean>((resolve, reject) => {
            Axios.post('/', new RPCRequest("walletpassphrase", [passphrase, 60], 1), this.config).then((resp: AxiosResponse<RPCResponse>) => {
                if (resp.status == 200) {
                    resolve(true);
                } else {
                    if(resp.data.error.code == -15)
                        resolve(true);
                    else
                        reject(resp.data.error);
                }
            })
        })
    };
}