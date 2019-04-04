import * as React from 'react';
import '../scss/components/sidebar.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import store from '../stores/globalStore';

export interface SideBarProps {

}

export interface SideBarState {

}

class SideBar extends React.Component<SideBarProps, SideBarState> {
    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Fullnode UI <small>v1.0.0</small> </div>
                <div className="list-group list-group-flush">
                    {/* this one repeats */}
                    <NavLink to="/index" className="d-flex list-group-item flex-row align-items-center list-group-item-action">
                        <FontAwesomeIcon icon={faBitcoin} size="2x" />
                        <span className="ml-2">Bitcoin</span>
                    </NavLink>
                    <a href="javascript:void(0)" onClick={()=> store.isNewNodeModalOpen = true} className="d-flex list-group-item flex-column align-items-center list-group-item-action">
                        <FontAwesomeIcon icon={faPlusCircle} size="1x" />
                        <span className="">Add another</span>
                    </a>
                </div>
                <div className="list-group list-group-flush list-group-bottom">
                    <NavLink to="/settings" className="d-flex list-group-item flex-row align-items-center list-group-item-action">
                        <FontAwesomeIcon icon={faCog} size="1x" />
                        <span className="ml-2">Settings</span>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default SideBar;