import * as React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import IndexPage from '.';
import OtherPage from './othersite';
import SideBar from '../components/sidebar';
import AddNewModal from '../components/modals/addNewNode';
import { observer } from 'mobx-react';
import { GlobalContext } from '../contexts/global';

const MasterPage = props => {
  return (
    <GlobalContext.Provider value={{test: 'idk'}}>
      <div className="d-flex" id="wrapper">
        <SideBar />
        <div id="page-content-wrapper">
          <Route path="/index" exact component={IndexPage} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
        <AddNewModal test="testowyprops" />
      </div>
    </GlobalContext.Provider>
  );
}

export default MasterPage;
