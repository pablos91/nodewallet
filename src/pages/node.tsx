import * as React from 'react';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import config from '../helpers/config';
import { FullNodeConfig } from '../models/fullNodeConfig';
import NodeBalance from '../components/node/balance';
import { Button } from 'reactstrap';
import NodeAddresses from '../components/node/addresses';
import SendToAddressModal from '../components/modals/sendToAddress';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NodeTransactions from '../components/node/transactions';

interface NodePageProps {
  id: string;
}

export const NodeContext = React.createContext({
  toggleSendToAddressModal: () => { }
});

const NodePage = ({ match }: RouteComponentProps<NodePageProps>) => {
  const { t, i18n } = useTranslation();
  const [node, setNode] = React.useState<FullNodeConfig>();
  const [state, setState] = React.useState({
    isSendToAddressModalOpen: false
  })

  const nodeContextValue = {
    toggleSendToAddressModal: () => setState({ ...state, isSendToAddressModalOpen: !state.isSendToAddressModalOpen })
  };

  React.useEffect(() => {
    config.getNodeInfo(match.params.id).then(node => {
      setNode(node);
    });
  }, [match.params.id]); // load new node on url change


  return node ? (
    <NodeContext.Provider value={nodeContextValue}>
      <main>
        <h2 className="text-primary">{node.name}</h2>
        <div className="row pb-5">
          <div className="col">
            <NodeBalance node={node} />
          </div>
          <div className="col-3 d-flex">
            <Button block onClick={() => setState({ ...state, isSendToAddressModalOpen: true })} color="primary"><FontAwesomeIcon icon={faUpload} /> Send</Button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-xs-12">
            <NodeAddresses node={node} />
            <br/>
          </div>
          <div className="col-lg-6 col-xs-12">
            <NodeTransactions node={node} />
            <br/>
          </div>
        </div>
        {state.isSendToAddressModalOpen &&
          <SendToAddressModal node={node} />
        }
      </main>
    </NodeContext.Provider>
  ) : (<main>Loading ...</main>);
}

export default NodePage;
