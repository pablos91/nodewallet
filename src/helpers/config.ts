import { Config as ConfigModel} from '../models/config';
import {FullNode} from '../models/fullNode';

const electron = require('electron');
const path = require('path');
const fs = require('fs');
const sha = require("crypto-js/sha256");

const configPath = path.join((electron.app || electron.remote.app).getPath('userData'), 'config.json');

class Config {
    constructor() {

    }

    config: ConfigModel = {
        nodes: [],
        language: "en"
    };

    readConfigFromDisk = () => {
        return new Promise<ConfigModel>((resolve) => {
            fs.exists(configPath, (exists) => {
                if (exists) {
                    this.config = JSON.parse(fs.readFileSync(configPath));
                } else {
                    fs.writeFileSync(configPath, JSON.stringify(this.config));
                }
                resolve(this.config);
            });
        });
    }

    saveNodeToConfig = (node:FullNode) => {
        return new Promise<FullNode>((resolve, reject) => {
            fs.exists(configPath, (exists) => {
                if (exists) {
                    this.config.nodes.push(node);
                    fs.writeFileSync(configPath, JSON.stringify(this.config));
                    resolve(node);
                } else {
                    reject();
                }
            });
        });
    }
}

const config = new Config();
export default config;