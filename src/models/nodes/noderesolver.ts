import { FullNodeConfig } from "../fullNode";
import { AxiosRequestConfig } from "axios";
import { FullNode } from "./node";
import { Bitcoin } from "./bitcoin";

export const NodeResolver = (node: FullNodeConfig) => {

    switch (node.type) {
        case "bitcoin":
            return new Bitcoin(node);
        default:
            return void (0);
    }

}