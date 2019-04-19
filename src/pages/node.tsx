import * as React from 'react';
import { BrowserRouter, RouteComponentProps, withRouter } from 'react-router-dom';
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
import NodeContext from '../contexts/nodecontext';
import { observer } from 'mobx-react-lite';

interface NodePageProps {
  id: string;
}

const NodePage = withRouter(observer(({ match }: RouteComponentProps<NodePageProps>) => {
  const { t, i18n } = useTranslation();
  const [node, setNode] = React.useState<FullNodeConfig>();
  const {isReachable, isSendModalOpen, toggleSendModal} = React.useContext(NodeContext);

  React.useEffect(() => {
    setNode(null);
    config.getNodeInfo(match.params.id).then(node => {
      setNode(node);
    });

  }, [match.params.id]); // load new node on url change


  return (<div>
    {node &&
      (<main>
        {!isReachable &&
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
            <Button disabled={!isReachable} block onClick={() => toggleSendModal()} color="primary"><FontAwesomeIcon icon={faUpload} /> {t("send")}</Button>
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
        {isSendModalOpen && isReachable &&
          <SendToAddressModal node={node} />
        }
      </main>)
    }
  </div>
  );
}))

export default NodePage;
