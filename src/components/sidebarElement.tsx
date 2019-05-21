import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle, faPoundSign, faCoins, faCloud, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { FullNodeConfig } from '../models/fullNodeConfig';
import { node } from 'prop-types';
import { NodeResolver } from '../models/nodes/noderesolver';
import { Observer, useObservable } from "mobx-react-lite"
import { NodeInfo } from '../models/nodeInfo';
import { UncontrolledTooltip } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface SidebarElementProps {
    node: FullNodeConfig;
}

const SideBarElement = ({ node }: SidebarElementProps) => {
    const resolvedNode = NodeResolver(node);
    const { t, i18n } = useTranslation();
    const icon = node.type == "bitcoin" ? faBitcoin : node.type == "litecoin" ? faPoundSign : faCoins;
    const state = useObservable({
        nodeInfo: {} as NodeInfo
    });

    const getBlockchainInfo = () => {
        resolvedNode.getBlockchainInfo().then((resp) => {
            state.nodeInfo = resp;
        });
    }

    React.useEffect(() => {
        getBlockchainInfo();

        let interval = setInterval(() => {
            getBlockchainInfo();
        }, 1000);

        return () => { clearInterval(interval); resolvedNode.cancelToken.cancel(); };
    }, []);

    return (
        <NavLink to={"/node/" + node.id} className="d-flex list-group-item flex-row align-items-center list-group-item-action">
            <FontAwesomeIcon icon={icon} size="2x" />
            <span className="ml-2">{node.name}</span>
            <Observer>{() => <span id={"blockchainInfo_"+node.id} className={`ml-auto`}>{state.nodeInfo.progress == 1 ? <FontAwesomeIcon icon={faCloud} /> : <FontAwesomeIcon icon={faCloudDownloadAlt} />}</span>}</Observer>
            <UncontrolledTooltip placement="bottom" target={"blockchainInfo_"+node.id}>
                <Observer>{()=> state.nodeInfo.blocks ? <span>{`${state.nodeInfo.blocks} ${t("out_of")} ${state.nodeInfo.blocks} ${t("blocks")}`}<br/>({state.nodeInfo.progress * 100}%)</span> : <span>{t("node_unreachable")}</span> }</Observer>
            </UncontrolledTooltip>
        </NavLink>
    );
}

export default SideBarElement;