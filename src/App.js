import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { ContextProvider } from './globalState/state';
import { AuthContext } from './globalState/';
import Login from './components/login/Login';
import Menu from './components/menu/Menu';
import Home from './components/home/Home';
import User from './components/user/User';
import NotFound from './components/notFound/NotFound';

export const Button = styled.button`
  display: ${props => (props.show ? 'block' : 'none')};
  font-size: 1rem;
  color: rgb(161, 207, 90);
  background-color: transparent;
  cursor: pointer;
  border: 0.1rem solid transparent;
  padding: 0.3rem;
  &:hover,
  &:focus {
    color: white;
    background-color: rgb(161, 207, 90);
    border: 0.1rem solid rgb(161, 207, 90);
  }
`;

class App extends Component {
  render() {
    return (
      <ContextProvider>
        <AuthContext.Consumer>
          {authContext => (
            <React.Fragment>
              {authContext.isAuthenticated() ? (
                <React.Fragment>
                  {authContext.user && (
                    <Router>
                      <Menu />
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
      </ContextProvider>
    );
  }
}

export default App;
