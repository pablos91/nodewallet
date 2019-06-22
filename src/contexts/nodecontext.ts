import { createContext } from 'react';
import { decorate, observable, computed } from 'mobx';
import config from '../helpers/config';
import { FullNodeConfig } from '../models/fullNodeConfig';

class NodeContext {

    constructor() {

    }

    @observable isReachable: boolean = true;
    @observable isSendModalOpen: boolean = false;
    @observable balance: number = 0;
    
    toggleSendModal = () => {
        this.isSendModalOpen = !this.isSendModalOpen;
    }
}


export default createContext(new NodeContext())