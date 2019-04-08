import * as React from 'react';
import { BrowserRouter, RouteProps, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const sha = require("crypto-js/sha256");

interface SettingsRouteProps {
  id: string;
}

const Settings = ({location, match}: RouteComponentProps<SettingsRouteProps>) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <main>
      <h2>{t("settings")}</h2>  
      <button onClick={() => changeLanguage("pl")}>pl</button>
      <button onClick={() => changeLanguage("en")}>en</button>
    </main> 
  );
}

export default Settings;
