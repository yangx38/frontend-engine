import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { GlobalIcon } from './statics/iconfont/iconfont';
import { Globalstyle } from './style';
import Header from './common/header';
import Login from './common/login';
import SystemAdminMainpage from './pages/systemadmin/mainpage';
import SystemAdminUnitsBudgetsPeople from './pages/systemadmin/unitsbudgetspeople';
import FiscalStaffMainpage from './pages/fiscalstaff/mainpage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Globalstyle />
          <GlobalIcon/>
          <BrowserRouter>
            {/* common header */}
            <Header />
            <Route path='/login' exact component={Login}></Route>
            {/* system administrator */}
            <Route path='/systemadministrator/mainpage' exact component={SystemAdminMainpage}></Route>
            <Route path='/systemadministrator/unitsbudgetspeople' exact component={SystemAdminUnitsBudgetsPeople}></Route>
            {/* fiscal staff */}
            <Route path='/fiscalstaff/mainpage' exact component={FiscalStaffMainpage}></Route>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
