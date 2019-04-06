import { FullNode } from "../models/FullNode";
import {Config as ConfigModel} from '../models/config';
import { GlobalContext } from '../contexts/global';
import { useContext } from "react";

const electron = require('electron');
const path = require('path');
const fs = require('fs');


export class Config {

    path: string;
    config: ConfigModel;

    constructor() {
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, 'config.json');
        this.readConfigFromDisk();
    }

    private readConfigFromDisk() {
        this.config = JSON.parse(fs.readFileSync(this.path));
    }

    saveNodeInfo = (node: FullNode) => {
        var context = useContext(GlobalContext);
        this.config.nodes.push(node);
    }
}

export const config = new Config();