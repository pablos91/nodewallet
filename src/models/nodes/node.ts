export interface FullNode {
    getBalance: () => Promise<number>;
    getAddresses: (label?: string) => Promise<string[]>;
    getLabels?: () => Promise<string[]>;
}