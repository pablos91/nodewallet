import { RPCRequest } from "../rpcrequest";
import { FullNode } from "./node";
import { FullNodeConfig } from "../fullNodeConfig";
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosPromise, AxiosError } from "axios";
import { RPCResponse } from "../rpcresponse";
import _ = require("lodash");
import { SendToAddressForm } from "../sendToAddressForm";
import { Transaction } from "../transaction";
import i18n from "../../../i18n";
import { NodeInfo } from "../nodeInfo";

export class Bitcoin implements FullNode {
    symbol: string = "BTC";
    cancelToken = Axios.CancelToken.source();

    constructor(node: FullNodeConfig) {
        this.config = {
            baseURL: node.url,
            auth: {
                username: node.rpcuser,
                password: node.rpcpassword
            },
            timeout: 3000,
            cancelToken: this.cancelToken.token
        };
    }

    private config: AxiosRequestConfig;

    getBalance = () => {
        return new Promise<number>((resolve, reject) => {
            Axios.post('/', new RPCRequest("getbalance", [], 1), this.config).then((resp: AxiosResponse<RPCResponse>) => {
                resolve(resp.data.result);
            }).catch((error: AxiosError) => {
                reject(i18n.t("node_unreachable"));
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
                reject();
            })
        })
    };

    getNewAddress = (label: string = "") => {
        return new Promise<string>((resolve, reject) => {
            Axios.post('/', new RPCRequest("getnewaddress", [label], 1), this.config).then((resp: AxiosResponse<RPCResponse>) => {
                resolve(resp.data.result);
            }).catch((error: AxiosError) => {
                reject();
            })
        })
    };

    getLabels = () => {
        return new Promise<string[]>((resolve, reject) => {
            Axios.post('/', new RPCRequest("listlabels", [], 1), this.config).then((resp: AxiosResponse<RPCResponse>) => {
                resolve(resp.data.result);
            }).catch((error: AxiosError) => {
                reject();
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
                    reject();
                })
        })
    }

    getAllTransactions = () => {
        return new Promise<Transaction[]>((resolve, reject) => {
            Axios.post('/', new RPCRequest("listtransactions", [], 1), this.config)
                .then((resp: AxiosResponse<RPCResponse>) => {
                    let transactions = [] as Transaction[];

                    if(resp.data.result) {
                        resp.data.result.map((elem) => {
                            transactions.splice(0,0,{
                                amount: elem.amount,
                                received: elem.category == "receive",
                                confirmations: elem.confirmations,
                                id: elem.txid,
                                date: elem.time,
                                dateReceived: elem.timereceived,
                                address: elem.address
                            });
                        })
                    }

                    resolve(transactions);
                })
                .catch((error: AxiosError) => {
                    reject();
                })
        })
    }

    getBlockchainInfo = () => {
        return new Promise<NodeInfo>((resolve, reject) => {
            Axios.post('/', new RPCRequest("getblockchaininfo", [], 1), this.config)
                .then((resp: AxiosResponse<RPCResponse>) => {
                    if(resp.data.result) {
                        resolve({
                            blocks: resp.data.result.blocks,
                            blockHeaders: resp.data.result.headers,
                            progress: resp.data.result.blocks / resp.data.result.headers,
                            blockchain: resp.data.result.chain
                        });
                    }
                })
                .catch((error: AxiosError) => {
                    reject();
                })
        })
    }
}