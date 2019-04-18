import * as React from 'react';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import config from '../helpers/config';
import { FullNodeConfig } from '../models/fullNodeConfig';
import NodeBalance from '../components/node/balance';
import { Button, Alert } from 'reactstrap';
import NodeAddresses from '../components/node/addresses';
import SendToAddressModal from '../components/modals/sendToAddress';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NodeTransactions from '../components/node/transactions';
import { NodeResolver } from '../models/nodes/noderesolver';
import BlockUi from 'react-block-ui';

interface NodePageProps {
  id: string;
}

export const NodeContext = React.createContext(null);

const NodePage = ({ match }: RouteComponentProps<NodePageProps>) => {
  const { t, i18n } = useTranslation();
  const [node, setNode] = React.useState<FullNodeConfig>();
  const [nodeContext, dispatch] = React.useReducer((nodeState, action) => {
    switch(action.type) {
      case "OPEN_SEND_MODAL":
        return {...nodeState, isSendModalOpen: true};
      case "CLOSE_SEND_MODAL":
        return {...nodeState, isSendModalOpen: false};
      case "REACHABLE_CHECK":
        return {...nodeState, isReachable: action.value, isSendModalOpen: action.value ? nodeState.isSendModalOpen : false};
      default:
        return nodeState;
    }
  }, {
    isReachable: true,
    isSendModalOpen: false
  });

  React.useEffect(() => {
    setNode(null);
    config.getNodeInfo(match.params.id).then(node => {
      setNode(node);
    });

  }, [match.params.id]); // load new node on url change


  return (
    <NodeContext.Provider value={{nodeContext, dispatch}}>
      {node &&
        (<main>
          {!nodeContext.isReachable &&
            <Alert color="danger">
              {t("node_unreachable")}
            </Alert>
          }

          <h2 className="text-primary">{node.name}</h2>
          <div className="row pb-5">
            <div className="col">
              <NodeBalance node={node} />
            </div>
            <div className="col-3 d-flex">
              <Button disabled={!nodeContext.isReachable} block onClick={() => dispatch({type: 'OPEN_SEND_MODAL'})} color="primary"><FontAwesomeIcon icon={faUpload} /> {t("send")}</Button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-xs-12">
              <NodeAddresses node={node} />
              <br />
            </div>
            <div className="col-lg-6 col-xs-12">
              <NodeTransactions node={node} />
              <br />
            </div>
          </div>
          {nodeContext.isSendModalOpen && nodeContext.isReachable &&
            <SendToAddressModal node={node} />
          }
        </main>)
      }

    </NodeContext.Provider>
  );
}

export default NodePage;
