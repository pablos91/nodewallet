import { SendToAddressForm } from "../sendToAddressForm";
import { Transaction } from "../transaction";
import { CancelTokenSource } from "axios";
import { NodeInfo } from "../nodeInfo";

export interface FullNode {
    getBalance: () => Promise<number>;
    getAddresses: (label?: string) => Promise<string[]>;
    getLabels?: () => Promise<string[]>;
    sendToAddress: (payload: SendToAddressForm) => Promise<string>;
    unlockWallet?: (passphrase: string) => Promise<boolean>;
    getNewAddress?: (label?: string) => Promise<string>;
    getNewLabel?: (label?: string) => Promise<string>;
    getAllTransactions: () => Promise<Transaction[]>;
    getBlockchainInfo: () => Promise<NodeInfo>;
    symbol: string;
    cancelToken:CancelTokenSource;
}