import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import MasterPage from './pages/master';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/app.scss';
import "../i18n.ts";

ReactDOM.render(
  <HashRouter>
    <MasterPage/>
  </HashRouter>,
  document.getElementById('root') as HTMLElement
);