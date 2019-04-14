import { SendToAddressForm } from "../sendToAddressForm";

export interface FullNode {
    getBalance: () => Promise<number>;
    getAddresses: (label?: string) => Promise<string[]>;
    getLabels?: () => Promise<string[]>;
    sendToAddress: (payload: SendToAddressForm) => Promise<string>;
    unlockWallet?: (passphrase: string) => Promise<boolean>;
    getNewAddress?: (label?: string) => Promise<string>;
    symbol: string;
}