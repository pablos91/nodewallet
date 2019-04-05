import * as React from 'react';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation, Trans } from "react-i18next";
import i18n from "i18next";
import { FullNode } from '../models/FullNode';
import { GlobalStore } from '../stores/globalStore';

const IndexPage = (props: RouteComponentProps) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <GlobalStore.Consumer>
      {value => (
        <main>
          <h2>{t("Welcome to React")}</h2>
          <button onClick={() => changeLanguage("de")}>de</button>
          <button onClick={() => changeLanguage("en")}>en</button>
          <div className="App-intro">
            <Trans>
              To get started, edit <code>src/App.js</code> and save to reload.
            </Trans>
            {value.test}
            <Trans i18nKey="welcome">trans</Trans>
            <input value={value.test} onChange={(e)=> value.test = e.target.value}/>
          </div>
        </main>
      )}
    </GlobalStore.Consumer>
  );
}

export default IndexPage;
