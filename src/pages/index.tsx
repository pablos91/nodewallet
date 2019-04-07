import * as React from 'react';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";
import i18n from "i18next";
import { FullNode } from '../models/fullNode';

const IndexPage = (props: RouteComponentProps) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <main>
      <h2>{t("welcome")}</h2>
      <div className="App-intro">
        <Trans i18nKey="welcome"></Trans>
      </div>
    </main>
  );
}

export default IndexPage;
