import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { GlobalContext } from '../../contexts/global';
import { useTranslation } from 'react-i18next';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RPCRequest } from '../../models/rpcrequest';
import { FullNodeConfig } from '../../models/fullNodeConfig';
import { RPCResponse } from '../../models/rpcresponse';
import { NodeResolver } from '../../models/nodes/noderesolver';
import { NodeContext } from '../../pages/node';

interface NodeBalanceProps {
    node: FullNodeConfig;
}

const NodeBalance = ({ node }: NodeBalanceProps) => {
    const { t, i18n } = useTranslation();
    const global = React.useContext(GlobalContext);
    const {dispatch} = React.useContext(NodeContext);
    const [balance, setBalance] = React.useState(0);
    const [symbol, setSymbol] = React.useState('');
    const resolvedNode = NodeResolver(node);

    const getBalance = () => {
        //console.log('balance check');

        resolvedNode.getBalance().then(resp => {
            setBalance(resp);
            dispatch({type: 'REACHABLE_CHECK', value: true});
        })
        .catch((reason)=> dispatch({type: 'REACHABLE_CHECK', value: false}));

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
            <h2>{balance} {symbol}</h2>
        </div>
    );
}

export default NodeBalance;