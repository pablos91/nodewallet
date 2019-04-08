import * as React from 'react';
import { FullNode } from '../models/fullNode';
import config from '../helpers/config';
// every property of this class will be available between react routing navigation (usage: store.property). Refreshing page clears global store so if you want to keep something (like auth) in session use LocalStorage or SessionStorage or Cookies.

const defaults = {
    isNewNodeModalOpen: false,
    nodes: [],
    toggleNewNodeModal: () => { },
    addNewNodeToSidebar: (node: FullNode) => { }
}

export const GlobalContext = React.createContext(defaults);

export const GlobalProvider = ({ children }) => {

    const [global, setGlobal] = React.useState(defaults);
    const [nodes, setNodes] = React.useState([]);

    React.useEffect(() => {
        config.readConfigFromDisk().then(config => {
            setNodes(config.nodes);
        });
    }, []);

    const value = {
        isNewNodeModalOpen: global.isNewNodeModalOpen,
        nodes: nodes,
        toggleNewNodeModal: () => setGlobal({...global, isNewNodeModalOpen: !global.isNewNodeModalOpen }),
        addNewNodeToSidebar: (node: FullNode) => setNodes([...nodes, node])
    };

    return (<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>);
};
