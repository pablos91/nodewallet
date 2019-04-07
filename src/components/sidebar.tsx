import * as React from 'react';
import '../scss/components/sidebar.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { GlobalProvider, GlobalContext } from '../contexts/global';
import { useTranslation } from 'react-i18next';
import config from '../helpers/config';

const packageJson = require('../../package.json');
export interface SideBarProps {

}

const SideBar = (props: SideBarProps) => {
    const { t, i18n } = useTranslation();
    const [state, setState] = React.useState({ nodes: [] });
    React.useEffect(() => {
        // action here
        config.readConfigFromDisk().then(config => {
            setState({nodes: config.nodes});
        });
        
    }, []);
    return (
        <GlobalContext.Consumer>
            {({ toggleNewNodeModal }) => (
                <div className="bg-light border-right" id="sidebar-wrapper">
                    <div className="sidebar-heading">Fullnode UI <small>v{packageJson.version}</small> </div>
                    <div className="list-group list-group-flush">
                        {/* this one repeats */}
                        {state.nodes && state.nodes.map((elem, index) => (
                            <NavLink to="/index" className="d-flex list-group-item flex-row align-items-center list-group-item-action">
                                <FontAwesomeIcon icon={faBitcoin} size="2x" />
                                <span className="ml-2">Bitcoin</span>
                            </NavLink>
                        ))}
                        <a href="javascript:void(0)" onClick={toggleNewNodeModal} className="d-flex list-group-item flex-column align-items-center list-group-item-action">
                            <FontAwesomeIcon icon={faPlusCircle} size="1x" />
                            <span className="">Add another</span>
                        </a>
                    </div>
                    <div className="list-group list-group-flush list-group-bottom">
                        <NavLink to="/settings" className="d-flex list-group-item flex-row align-items-center list-group-item-action">
                            <FontAwesomeIcon icon={faCog} size="1x" />
                            <span className="ml-2">{t("settings")}</span>
                        </NavLink>
                    </div>
                </div>
            )}
        </GlobalContext.Consumer>
    );
}

export default SideBar;