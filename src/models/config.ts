import { FullNode } from "./FullNode";

export interface Config {
    nodes: FullNode[];
    language: string;
}