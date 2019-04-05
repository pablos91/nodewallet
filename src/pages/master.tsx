import * as React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import IndexPage from '.';
import OtherPage from './othersite';
import SideBar from '../components/sidebar';
import AddNewModal from '../components/modals/addNewNode';
import { observer } from 'mobx-react';
import { GlobalStore } from '../stores/globalStore';

const MasterPage = props => {
  return (
    <GlobalStore.Provider value={{test: 'idk'}}>
      <div className="d-flex" id="wrapper">
        <SideBar />
        <div id="page-content-wrapper">
          <Route path="/index" exact component={IndexPage} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
        <AddNewModal test="testowyprops" />
      </div>
    </GlobalStore.Provider>
  );
}

export default MasterPage;
