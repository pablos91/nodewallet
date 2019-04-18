import { FullNodeConfig } from "../fullNodeConfig";
import { AxiosRequestConfig } from "axios";
import { FullNode } from "./node";
import { Bitcoin } from "./bitcoin";
import { RPCResponse } from "../rpcresponse";
import { Litecoin } from "./litecoin";
import i18n from "../../../i18n";

export const NodeResolver = (node: FullNodeConfig) : FullNode => {
    switch (node.type) {
        case "bitcoin":
            return new Bitcoin(node);
        case "litecoin":
            return new Litecoin(node);
        default:
            throw i18n.t("implementation_not_found");
    }

}