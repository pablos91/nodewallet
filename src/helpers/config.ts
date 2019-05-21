import { Config as ConfigModel} from '../models/config';
import {FullNodeConfig} from '../models/fullNodeConfig';
import {getUniqueHash} from '../helpers/utilities';
import _ = require('lodash');
import { rejects } from 'assert';

const electron = require('electron');
const path = require('path');
const fs = require('fs');


const configPath = path.join((electron.app || electron.remote.app).getPath('userData'), 'config.json');

class Config {
    constructor() {

    }

    config: ConfigModel = {
        nodes: [],
        language: "en"
    };

    getNodeInfo = (nodeid:string) => {
        return new Promise<FullNodeConfig>((resolve,reject) => {
            fs.exists(configPath, (exists) => {
                if (exists) {
                    let config:ConfigModel = JSON.parse(fs.readFileSync(configPath));
                    var node = _.find(config.nodes, {id: nodeid});
                    resolve(node);
                } else 
                    reject();
            });
        });
    }

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

    saveNodeToConfig = (node:FullNodeConfig) => {
        let nodeToSave = {... node, id: getUniqueHash()}

        return new Promise<FullNodeConfig>((resolve, reject) => {
            fs.exists(configPath, (exists) => {
                if (exists) {
                    this.config.nodes.push(nodeToSave);
                    fs.writeFileSync(configPath, JSON.stringify(this.config));
                    resolve(nodeToSave);
                } else {
                    reject();
                }
            });
        });
    }

    removeNodeFromConfig = (node:FullNodeConfig) => {
        return new Promise<FullNodeConfig>((resolve, reject) => {
            fs.exists(configPath, (exists) => {
                if (exists) {
                    this.config.nodes.splice(this.config.nodes.indexOf(node), 1);
                    fs.writeFileSync(configPath, JSON.stringify(this.config));
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }
}

const config = new Config();
export default config;