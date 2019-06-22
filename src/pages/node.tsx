import * as React from 'react';
import { BrowserRouter, RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import config from '../helpers/config';
import { FullNodeConfig } from '../models/fullNodeConfig';
import NodeBalance from '../components/node/balance';
import { Button, Alert } from 'reactstrap';
import NodeAddresses from '../components/node/addresses';
import SendToAddressModal from '../components/modals/sendToAddress';
import { faUpload, faSadTear, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NodeTransactions from '../components/node/transactions';
import { NodeResolver } from '../models/nodes/noderesolver';
import BlockUi from 'react-block-ui';
import NodeContext from '../contexts/nodecontext';
import { observer } from 'mobx-react-lite';
import Scrollbars from 'react-custom-scrollbars';
import GlobalContext from '../contexts/global';

interface NodePageProps {
  id: string;
}

const NodePage = withRouter(observer(({ match }: RouteComponentProps<NodePageProps>) => {
  const { t, i18n } = useTranslation();
  const [node, setNode] = React.useState<FullNodeConfig>();
  const [isDestructive, setDestructive] = React.useState<boolean>();

  const nodeContext = React.useContext(NodeContext);
  const { removeNode } = React.useContext(GlobalContext);

  const tryRemoveNode = () => {
    config.removeNodeFromConfig(node).then(() => {
      removeNode(node);
      setDestructive(true);
    });
  }

  React.useEffect(() => {
    setNode(null);
    nodeContext.isReachable = true;
    config.getNodeInfo(match.params.id).then(node => {
      setNode(node);
    });

  }, [match.params.id]); // load new node on url change


  return isDestructive ? <Redirect to={'/index'} /> : node ? (<div className="h-100">
    {nodeContext.isReachable ?
      <Scrollbars style={{ height: 'calc(100vh - 26px)' }} autoHide>
        <main>
          <h2 className="text-primary">{node.name}</h2>
          <div className="row pb-5">
            <div className="col">
              <NodeBalance node={node} />
            </div>
            <div className="col-3 d-flex">
              <Button disabled={!nodeContext.isReachable} block onClick={() => nodeContext.toggleSendModal()} color="primary"><FontAwesomeIcon icon={faUpload} /> {t("send")}</Button>
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
          <SendToAddressModal node={node} isOpen={nodeContext.isSendModalOpen && nodeContext.isReachable}/>
        </main>
      </Scrollbars>
      :
      <div className="d-flex justify-content-center bg-info text-light h-100 align-items-center flex-column">
        <FontAwesomeIcon icon={faWifi} size="4x" className="mb-2"/>
        <p>{t("node_unreachable")}</p>
        <Button onClick={() => tryRemoveNode()} color="danger">{t("delete_node")}</Button>
      </div>
    }
  </div>
  ) : (<div></div>)
}))

export default NodePage;
