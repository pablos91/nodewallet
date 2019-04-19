import * as React from 'react';
import { BrowserRouter, Route, NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import IndexPage from '.';
import SideBar from '../components/sidebar';
import AddNewModal from '../components/modals/addNewNode';
import GlobalStore from '../contexts/global';
import Scrollbars, { positionValues } from 'react-custom-scrollbars';
import Settings from './settings';
import NodePage from './node';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite'

const { remote } = require('electron')
const {platform} = require('os');

const MasterPage = withRouter(observer((props: RouteComponentProps) => {
  const {nodes, toggleNewNodeModal, isNewNodeModalOpen} = React.useContext(GlobalStore);

  const closeApplication = () => {
    remote.getCurrentWindow().close();
  }

  return (
      <div className="d-flex flex-column">
        <div id="toolbar" className="d-flex text-light bg-primary px-2">
          {process.platform != "darwin" ?
          <a className="ml-auto" style={{ 'cursor': 'pointer' }} onClick={closeApplication}>
            <FontAwesomeIcon icon={faTimes} />
          </a>
          :
          <span>&nbsp;</span>
          }
          
        </div>
        <div className="d-flex" id="wrapper">
          <SideBar nodes={nodes} toggleNewNodeModal={toggleNewNodeModal} />
          <div id="page-content-wrapper">
            <Scrollbars style={{ height: 'calc(100vh - 26px)' }} autoHide>
              <Route path="/index" exact component={IndexPage} />
              <Route path="/node/:id" component={NodePage} />
              <Route path="/settings" component={Settings} />
            </Scrollbars>
          </div>
          <div>{isNewNodeModalOpen && <AddNewModal />}</div>
        </div>
      </div>
  );
}))

export default MasterPage;
