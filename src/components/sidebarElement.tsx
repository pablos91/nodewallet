import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { FullNode } from '../models/fullNode';
import { node } from 'prop-types';

interface SidebarElementProps {
    node: FullNode;
}

const SideBarElement = (props: SidebarElementProps) => (
    <NavLink to={"/nodes/"+props.node.id} className="d-flex list-group-item flex-row align-items-center list-group-item-action">
        <FontAwesomeIcon icon={faBitcoin} size="2x" />
        <span className="ml-2">{props.node.name}</span>
    </NavLink>
);

export default SideBarElement;