import * as React from 'react';
import { FullNode } from '../models/fullNode';
import config from '../helpers/config';
// every property of this class will be available between react routing navigation (usage: store.property). Refreshing page clears global store so if you want to keep something (like auth) in session use LocalStorage or SessionStorage or Cookies.

interface GlobalContextModel {
    isNewNodeModalOpen?: boolean;
    nodes?: FullNode[];
    toggleNewNodeModal?: () => void;
}

const defaults = {
    isNewNodeModalOpen: false,
    nodes: [],
    toggleNewNodeModal: () => { }
}

export const GlobalContext = React.createContext(defaults);

export const GlobalProvider = ({ children }) => {

    const [global, setGlobal] = React.useState<GlobalContextModel>(defaults);
    
    React.useEffect(() => {
        // action here
        config.readConfigFromDisk().then(config => {
            setGlobal({nodes: config.nodes});
        });
    }, []);

    const value = {
        isNewNodeModalOpen: global.isNewNodeModalOpen,
        nodes: global.nodes,
        toggleNewNodeModal: () => setGlobal({ isNewNodeModalOpen: !global.isNewNodeModalOpen })
    };

    return (<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>);
};
