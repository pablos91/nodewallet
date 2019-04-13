import * as React from 'react';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import config from '../helpers/config';
import { FullNode } from '../models/fullNode';
import NodeBalance from '../components/node/balance';

interface NodePageProps {
    id: string;
}

const NodePage = ({match}: RouteComponentProps<NodePageProps>) => {
  const { t, i18n } = useTranslation();
  const [node, setNode] = React.useState<FullNode>();

  React.useEffect(()=>{
    config.getNodeInfo(match.params.id).then(node => {
      setNode(node);
    });
  }, [match.params.id]); // load new node on url change
  

  return node ? (
    <main>
      <h2>{node.name}</h2>
        <NodeBalance node={node} />
    </main>
  ) : (<main>Loading ...</main>);
}

export default NodePage;
