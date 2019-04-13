export interface FullNode {
    getBalance: () => Promise<number>;
}