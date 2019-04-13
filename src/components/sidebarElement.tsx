import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle, faPoundSign, faCoins } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { FullNodeConfig } from '../models/fullNodeConfig';
import { node } from 'prop-types';

interface SidebarElementProps {
    node: FullNodeConfig;
}

const SideBarElement = ({node}: SidebarElementProps) => {

    const icon = node.type == "bitcoin" ? faBitcoin : node.type == "litecoin" ? faPoundSign : faCoins;

    return (
        <NavLink to={"/node/" + node.id} className="d-flex list-group-item flex-row align-items-center list-group-item-action">
            <FontAwesomeIcon icon={icon} size="2x" />
            <span className="ml-2">{node.name}</span>
        </NavLink>
    );
}

export default SideBarElement;