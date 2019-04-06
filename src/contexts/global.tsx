import * as React from 'react';
// every property of this class will be available between react routing navigation (usage: store.property). Refreshing page clears global store so if you want to keep something (like auth) in session use LocalStorage or SessionStorage or Cookies.

export const GlobalContext = React.createContext({
    isNewNodeModalOpen: false,
    toggleNewNodeModal: () => { },
});

export const GlobalProvider = ({ children }) => {
    const [global, setGlobal] = React.useState({ isNewNodeModalOpen: false });
    const value = {
        isNewNodeModalOpen: global.isNewNodeModalOpen,
        toggleNewNodeModal: () => setGlobal({ isNewNodeModalOpen: !global.isNewNodeModalOpen }),
    };
    return (<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>);
};
