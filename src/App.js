import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { ContextProvider } from './globalState/state';
import { AuthContext, AlertContext } from './globalState/';
import Login from './components/login/Login';
import Menu from './components/menu/Menu';
import Home from './components/home/Home';
import User from './components/user/User';
import NotFound from './components/notFound/NotFound';
import Alert from './components/alert/Alert';

const theme = {
  bgArea: 'rgb(78, 78, 78)',
  principalColor: '#ecd018',
  errorColor: 'rgba(255, 20, 29, 1)',
  noErrorColor: '#ccc',
};

class App extends Component {
  render() {
    return (
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <AuthContext.Consumer>
            {authContext => (
              <React.Fragment>
                {authContext.isAuthenticated() ? (
                  <React.Fragment>
                    {authContext.user && (
                      <Router>
                        <Menu />
                        <AlertContext.Consumer>
                          {alertContext => alertContext.showAlert && <Alert />}
                        </AlertContext.Consumer>
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/user" component={User} />
                          <Route component={NotFound} />
                        </Switch>
                      </Router>
                    )}
                  </React.Fragment>
                ) : (
                  <Login />
                )}
              </React.Fragment>
            )}
          </AuthContext.Consumer>
        </ThemeProvider>
      </ContextProvider>
    );
  }
}

export default App;
