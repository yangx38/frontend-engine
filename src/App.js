import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { GlobalIcon } from './statics/iconfont/iconfont';
import { Globalstyle } from './style';
// common
import Header from './common/header';
import FormForSubmitter from './common/form';
import Login from './common/login';
// system administrator
import SystemAdminMainpage from './pages/systemadmin/mainpage';
import SystemAdminUnitsBudgetsPeople from './pages/systemadmin/unitsbudgetspeople';
// fiscal staff
import FiscalStaffMainpage from './pages/fiscalstaff/mainpage';
import FiscalStaffApproveRequests from './pages/fiscalstaff/approverequests';
// approver
import ApproverMainpage from './pages/approver/mainpage';
import ApproverApproveRequests from './pages/approver/approverequests';
import ApproverDetailPage from './pages/approver/details';
// submitter
import SubmitterMainpage from './pages/submitter/mainpage';
import SubmitterMyRequests from './pages/submitter/myrequests';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Globalstyle />
          <GlobalIcon/>
          <BrowserRouter>
            {/* common */}
            <Header />
            <Route path='/form/submitrequests' exact component={FormForSubmitter}></Route>
            <Route path='/login' exact component={Login}></Route>
            {/* system administrator */}
            <Route path='/systemadministrator/mainpage' exact component={SystemAdminMainpage}></Route>
            <Route path='/systemadministrator/unitsbudgetspeople' exact component={SystemAdminUnitsBudgetsPeople}></Route>
            {/* fiscal staff */}
            <Route path='/fiscalstaff/mainpage' exact component={FiscalStaffMainpage}></Route>
            <Route path='/fiscalstaff/approverequests' exact component={FiscalStaffApproveRequests}></Route>
            {/* approver */}
            <Route path='/approver/mainpage' exact component={ApproverMainpage}></Route>
            <Route path='/approver/approverequests' exact component={ApproverApproveRequests}></Route>
            <Route path='/approver/approverequests/requestdetails' exact component={ApproverDetailPage}></Route>
            {/* submitter */}
            <Route path='/submitter/mainpage' exact component={SubmitterMainpage}></Route>
            <Route path='/submitter/myrequests' exact component={SubmitterMyRequests}></Route>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
