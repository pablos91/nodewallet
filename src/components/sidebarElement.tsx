import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { FullNodeConfig } from '../models/fullNode';
import { node } from 'prop-types';

interface SidebarElementProps {
    node: FullNodeConfig;
}

const SideBarElement = (props: SidebarElementProps) => (
    <NavLink to={"/node/"+props.node.id} className="d-flex list-group-item flex-row align-items-center list-group-item-action">
        <FontAwesomeIcon icon={faBitcoin} size="2x" />
        <span className="ml-2">{props.node.name}</span>
    </NavLink>
);

export default SideBarElement;