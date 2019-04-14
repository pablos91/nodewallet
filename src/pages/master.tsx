import * as React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import IndexPage from '.';
import SideBar from '../components/sidebar';
import AddNewModal from '../components/modals/addNewNode';
import { GlobalProvider, GlobalContext } from '../contexts/global';
import Scrollbars, { positionValues } from 'react-custom-scrollbars';
import Settings from './settings';
import NodePage from './node';

const MasterPage = () => {
  return (
    <GlobalProvider>
      <div className="d-flex" id="wrapper">
        <SideBar />
        <div id="page-content-wrapper">
          <Scrollbars style={{ height: '100vh' }} autoHide>
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
    </GlobalProvider>
  );
}

export default MasterPage;
