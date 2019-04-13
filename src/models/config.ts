import { FullNodeConfig } from "./FullNode";

export interface Config {
    nodes: FullNodeConfig[];
    language: string;
}