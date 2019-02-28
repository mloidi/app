import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Auth from './common/auth.common';
import Menu from './Components/Menu';
import Login from './Page/Login';
import Dashboard from './Page/Dashboard';
import Address from './Page/Address';
import Resume from './Page/Resume';
import Blog from './Page/Blog';
import Admin from './Page/Admin/Admin';
import Message from './Page/Message';
import Account from './Page/Account';
import NotFound from './Page/NotFound';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            {Auth.isUserAuthenticated() && <Menu />}
            <Switch>
              <Route
                exact
                path="/"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Login {...props} />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <Dashboard {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/address"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <Address {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/resume"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <Resume {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/blog"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <Blog {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/admin"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <Admin {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/message"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <Message {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/account"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <Account {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route component={NotFound} />
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
