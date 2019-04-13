import * as React from 'react';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";
import i18n from "i18next";
import { FullNodeConfig } from '../models/fullNode';

const IndexPage = (props: RouteComponentProps) => {
  const { t, i18n } = useTranslation();

  return (
    <main>
      <h2>{t("welcome")}</h2>
    </main>
  );
}

export default IndexPage;
