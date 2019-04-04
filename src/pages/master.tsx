import * as React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import IndexPage from '.';
import OtherPage from './othersite';
import SideBar from '../components/sidebar';
import AddNewModal from '../components/modals/addNewNode';
import { observer } from 'mobx-react';
import store from '../stores/globalStore';

@observer
class MasterPage extends React.Component {
  render() {

    return (
      <div className="d-flex" id="wrapper">
        <SideBar/>
        <div id="page-content-wrapper">
          <Route path="/index" exact component={IndexPage}/>
          <Route path="/otherpage" component={OtherPage}/>
        </div>
        {
          store.isNewNodeModalOpen &&
          <AddNewModal />
        }
        
      </div>
    );
  }
}

export default MasterPage;
