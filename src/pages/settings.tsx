import * as React from 'react';
import { BrowserRouter, RouteProps, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SettingsRouteProps {
  id: string;
}

const Settings = ({location, match}: RouteComponentProps<SettingsRouteProps>) => {
  const {t} = useTranslation();
  return (
    <main>
      <h2>{t("settings")}</h2>  
    </main> 
  );
}

export default Settings;
