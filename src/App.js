import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { GlobalIcon } from './statics/iconfont/iconfont';
import { Globalstyle } from './style';
import Header from './common/header';
import Login from './common/login';

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
            
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
