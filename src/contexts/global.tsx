import * as React from 'react';
// every property of this class will be available between react routing navigation (usage: store.property). Refreshing page clears global store so if you want to keep something (like auth) in session use LocalStorage or SessionStorage or Cookies.

const electron = require('electron');
const path = require('path');
const fs = require('fs');
const sha = require("crypto-js/sha256");

export const GlobalContext = React.createContext({
    isNewNodeModalOpen: false,
    nodes: [],
    toggleNewNodeModal: () => { },
});

const configPath = path.join((electron.app || electron.remote.app).getPath('userData'), 'config.json');

const defaultConfig = {
    nodes: [],
    language: "en"
};

export const GlobalProvider = ({ children }) => {
    function readConfigFromDisk() {
        var config = {...defaultConfig};

        fs.exists(configPath, (exists) => {
            if (exists) {
                config = JSON.parse(fs.readFileSync(configPath));
                console.log(config);
            } else {
                fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
            }
        });

        return config;
    }
    
    const [global, setGlobal] = React.useState({ isNewNodeModalOpen: false });
    const value = {
        isNewNodeModalOpen: global.isNewNodeModalOpen,
        nodes: readConfigFromDisk().nodes,
        toggleNewNodeModal: () => setGlobal({ isNewNodeModalOpen: !global.isNewNodeModalOpen }),
    };
    return (<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>);
};
