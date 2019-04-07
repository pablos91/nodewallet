import { Config as ConfigModel} from '../models/config';

const electron = require('electron');
const path = require('path');
const fs = require('fs');
const sha = require("crypto-js/sha256");

const configPath = path.join((electron.app || electron.remote.app).getPath('userData'), 'config.json');

const defaultConfig = {
    nodes: [],
    language: "en"
};

class Config {
    constructor() {

    }

    readConfigFromDisk = () => {
        return new Promise<ConfigModel>((resolve) => {
            var config = { ...defaultConfig };

            fs.exists(configPath, (exists) => {
                if (exists) {
                    resolve(JSON.parse(fs.readFileSync(configPath)));
                } else {
                    fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
                    resolve(config);
                }
            });
        });
    }
}

const config = new Config();
export default config;