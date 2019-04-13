import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { GlobalContext } from '../../contexts/global';
import { useTranslation } from 'react-i18next';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RPCRequest } from '../../models/rpcrequest';
import { FullNode } from '../../models/fullNode';
import { RPCResponse } from '../../models/rpcresponse';

interface NodeBalanceProps {
    node: FullNode;
}

const NodeBalance = ({ node }: NodeBalanceProps) => {
    const { t, i18n } = useTranslation();
    const global = React.useContext(GlobalContext);
    const [balance, setBalance] = React.useState(0);

    React.useEffect(() => {

        Axios.post('/', new RPCRequest("getbalance", [], 1), {
            baseURL: node.url,
            auth: {
              username: node.rpcuser,
              password: node.rpcpassword
            }
          }).then((resp:AxiosResponse<RPCResponse>) => {
            if (resp.status == 200) {
                setBalance(resp.data.result);
            }
        });

    }, [node]);

    return (
        <div>
            <strong>{t("balance")}</strong>
            <h2>{balance}</h2>
        </div>
    );
}

export default NodeBalance;