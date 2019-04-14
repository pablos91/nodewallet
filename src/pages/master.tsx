import * as React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import IndexPage from '.';
import SideBar from '../components/sidebar';
import AddNewModal from '../components/modals/addNewNode';
import { GlobalProvider, GlobalContext } from '../contexts/global';
import Scrollbars, { positionValues } from 'react-custom-scrollbars';
import Settings from './settings';
import NodePage from './node';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const { remote } = require('electron')

const MasterPage = () => {

  const closeApplication = () => {
    remote.getCurrentWindow().close();
  }

  return (
    <GlobalProvider>
      <div className="d-flex flex-column">
        <div id="toolbar" className="d-flex text-light bg-primary px-2">
          <a className="ml-auto" style={{ 'cursor': 'pointer' }} onClick={closeApplication}>
            <FontAwesomeIcon icon={faTimes} />
          </a>
        </div>
        <div className="d-flex" id="wrapper">
          <SideBar />
          <div id="page-content-wrapper">
            <Scrollbars style={{ height: 'calc(100vh - 24px)' }} autoHide>
              <Route path="/index" exact component={IndexPage} />
              <Route path="/node/:id" component={NodePage} />
              <Route path="/settings" component={Settings} />
            </Scrollbars>
          </div>
          <GlobalContext.Consumer>
            {({ isNewNodeModalOpen }) => (
              <div>{isNewNodeModalOpen && <AddNewModal />}</div>
            )}
          </GlobalContext.Consumer>

        </div>
      </div>

    </GlobalProvider>
  );
}

export default MasterPage;
