import * as React from 'react';
import '../scss/components/sidebar.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { GlobalProvider, GlobalContext } from '../contexts/global';
import { useTranslation } from 'react-i18next';
import config from '../helpers/config';
import { FullNodeConfig } from '../models/fullNode';
import SideBarElement from './sidebarElement';

const packageJson = require('../../package.json');

const SideBar = () => {
    const { t, i18n } = useTranslation();
    const global = React.useContext(GlobalContext);


    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Fullnode UI <small>v{packageJson.version}</small> </div>
            <div className="list-group list-group-flush">
                {/* this one repeats */}
                {global.nodes && global.nodes.map((elem: FullNodeConfig, index) => (
                    <SideBarElement key={"sidebar_element_" + index} node={elem} />
                ))}
                <a href="javascript:void(0)" onClick={global.toggleNewNodeModal} className="d-flex list-group-item flex-column align-items-center list-group-item-action">
                    <FontAwesomeIcon icon={faPlusCircle} size="1x" />
                    <span className="">{t("add_new_node")}</span>
                </a>
            </div>
            <div className="list-group list-group-flush list-group-bottom">
                <NavLink to="/settings" className="d-flex list-group-item flex-row align-items-center list-group-item-action">
                    <FontAwesomeIcon icon={faCog} size="1x" />
                    <span className="ml-2">{t("settings")}</span>
                </NavLink>
            </div>
        </div>
    );
}

export default SideBar;