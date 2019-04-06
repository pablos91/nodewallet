import * as React from 'react';
import { BrowserRouter, RouteProps, RouteComponentProps } from 'react-router-dom';

interface SettingsRouteProps {
  id: string;
}

const Settings = ({location, match}: RouteComponentProps<SettingsRouteProps>) => {
  return (
    <main>Inna Stronka {location.pathname}</main> 
  );
}

export default Settings;
