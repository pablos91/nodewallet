import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { useTranslation } from 'react-i18next';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RPCRequest } from '../../models/rpcrequest';
import { FullNodeConfig } from '../../models/fullNodeConfig';
import { RPCResponse } from '../../models/rpcresponse';
import { NodeResolver } from '../../models/nodes/noderesolver';
import NodeContext from '../../contexts/nodecontext';
import { observer } from 'mobx-react-lite';

interface NodeBalanceProps {
    node: FullNodeConfig;
}

const NodeBalance = observer(({ node }: NodeBalanceProps) => {
    const { t, i18n } = useTranslation();
    const nodeContext = React.useContext(NodeContext);
    //const [balance, setBalance] = React.useState(0);
    const [symbol, setSymbol] = React.useState('');
    const resolvedNode = NodeResolver(node);

    const getBalance = () => {
        //console.log('balance check');

        resolvedNode.getBalance().then(resp => {
            nodeContext.balance = resp;
            nodeContext.isReachable = true;
        })
        .catch((reason)=> nodeContext.isReachable = false);

        setSymbol(resolvedNode.symbol);
    }

    React.useEffect(() => {
        getBalance();

        let interval = setInterval(()=> {
            getBalance();
        }, 5000);

        return () => { clearInterval(interval); resolvedNode.cancelToken.cancel(); };
    }, [node]); // load new data on node props change

    return (
        <div>
            <strong>{t("balance")}</strong>
            <h2>{nodeContext.balance} {symbol}</h2>
        </div>
    );
})

export default NodeBalance;