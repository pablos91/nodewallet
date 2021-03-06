import { createContext } from 'react';
import { decorate, observable, computed } from 'mobx';
import config from '../helpers/config';
import { FullNodeConfig } from '../models/fullNodeConfig';

class GlobalStore {

    constructor() {
        config.readConfigFromDisk().then(config => {
            this.nodes = config.nodes;
        });
    }

    @observable nodes: FullNodeConfig[] = [];
    @observable isNewNodeModalOpen: boolean = false;

    toggleNewNodeModal = () => {
        this.isNewNodeModalOpen = !this.isNewNodeModalOpen;
    }

    addNewNode = (node: FullNodeConfig) => {
        this.nodes.push(node);
    }

    removeNode = (node: FullNodeConfig) => {
        this.nodes.splice(this.nodes.indexOf(node), 1);
    }
}


export default createContext(new GlobalStore())