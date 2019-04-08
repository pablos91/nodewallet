import * as React from 'react';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from "react-i18next";

interface NodePageProps {
    id: string;
}

const NodePage = ({match}: RouteComponentProps<NodePageProps>) => {
  const { t, i18n } = useTranslation();

  return (
    <main>
      <h2>{match.params.id}</h2>
    </main>
  );
}

export default NodePage;
