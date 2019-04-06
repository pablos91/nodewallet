import * as React from 'react';
// every property of this class will be available between react routing navigation (usage: store.property). Refreshing page clears global store so if you want to keep something (like auth) in session use LocalStorage or SessionStorage or Cookies.

export function useGlobalStore() {
    
    const context = React.createContext({
        isNewNodeModalOpen: false,
        toggleNewNodeModal: () => { },
    });

    const Provider = ({ children }) => {
        const [global, setGlobal] = React.useState({isNewNodeModalOpen: false});
        const value = {
            isNewNodeModalOpen: global.isNewNodeModalOpen,
            toggleNewNodeModal: ()=>setGlobal({isNewNodeModalOpen: !global.isNewNodeModalOpen}),
        };
        return (<context.Provider value={value}>{children}</context.Provider>);
    };

    return [context, Provider];
}