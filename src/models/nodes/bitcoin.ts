import { RPCRequest } from "../rpcrequest";
import { FullNode } from "./node";
import { FullNodeConfig } from "../fullNodeConfig";
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosPromise, AxiosError } from "axios";
import { RPCResponse } from "../rpcresponse";
import _ = require("lodash");
import { SendToAddressForm } from "../sendToAddressForm";

export class Bitcoin implements FullNode {
    symbol: string = "BTC";

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
                resolve(resp.data.result);
            }).catch((error: AxiosError) => {
                reject(error.response.data.error);
            })
        })
    }

    getAddresses = (label: string = "") => {
        return new Promise<string[]>((resolve, reject) => {
            Axios.post('/', new RPCRequest("getaddressesbylabel", [label], 1), this.config).then((resp: AxiosResponse<RPCResponse>) => {
                let addresses: string[] = [];
                _.forOwn(resp.data.result, (v, k) => addresses.push(k));
                resolve(addresses);
            }).catch((error: AxiosError) => {
                reject(error.response.data.error);
            })
        })
    };

    getLabels = () => {
        return new Promise<string[]>((resolve, reject) => {
            Axios.post('/', new RPCRequest("listlabels", [], 1), this.config).then((resp: AxiosResponse<RPCResponse>) => {
                resolve(resp.data.result);
            }).catch((error: AxiosError) => {
                reject(error.response.data.error);
            })
        })
    };

    unlockWallet = (passphrase: string) => {
        return new Promise<boolean>((resolve, reject) => {
            Axios.post('/', new RPCRequest("walletpassphrase", [passphrase, 60], 1), this.config)
                .then((resp: AxiosResponse<RPCResponse>) => {
                    resolve(true);
                })
                .catch((error: AxiosError) => {
                    if (error.response.data.error.code == -15)
                        resolve(true);
                    else
                        reject(false);
                })
        })
    };

    sendToAddress = (payload: SendToAddressForm) => {
        return new Promise<string>((resolve, reject) => {
            Axios.post('/', new RPCRequest("sendtoaddress", [payload.address, payload.amount, payload.comment, "", true], 1), this.config)
                .then((resp: AxiosResponse<RPCResponse>) => {
                    resolve(resp.data.result); // thats txid in string
                })
                .catch((error: AxiosError) => {
                    reject(error.response.data.error.message);
                })
        })
    }
}