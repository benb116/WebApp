import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './features/Home/Home';
import Verified from './features/Home/Verified';
import Login from './features/User/Login';
import Signup from './features/User/Signup';
import Forgot from './features/User/Forgot';
import Reset from './features/User/Reset';
import Account from './features/User/Account';

import PrivateRoute from './helpers/PrivateRoute';

function App() {
  return (
    <div
      className="App"
      id="root"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Router>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Signup} path="/signup" />
          <Route exact component={Forgot} path="/forgot" />
          <Route exact component={Verified} path="/verified" />
          <Route exact component={Reset} path="/resetPassword/:token" />
          <PrivateRoute exact component={Account} path="/account" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
