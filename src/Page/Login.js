import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { AuthService } from '../Service/data.service';
import Label from '../Components/Label';
import Input from '../Components/Input';

const LoginDiv = styled.div`
  background-color: white;
  margin: 10% 20% 10% 20%;
  padding: 1rem;
  font-size: 1rem;
`;

const LoginForm = styled.form`
  margin: 0.5rem 3rem 0.5rem 3rem;
  display: grid;
  grid-auto-columns: auto;
`;

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    disabledButton: false,
    emailValid: true,
    passwordValid: true
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid =
          value.length === 0 ||
          value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      case 'password':
        passwordValid = value.length === 0 || value.length > 0;
        //   passwordValid =
        //       value.length === 0 ||
        //       value.match(/^(\+34|0034|34)?[ -]*(6|7|8|9)[ -]*([0-9][ -]*){8}$/i);
        break;
      default:
        break;
    }
    this.setState({
      emailValid,
      passwordValid
    });
  }

  canBeSubmitted() {
    const { email, password, emailValid, passwordValid } = this.state;
    return (
      emailValid && passwordValid && password.length > 0 && email.length > 0
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.login(this.state.email, this.state.password);
  };

  login = async (email, password) => {
    await AuthService.login(email, password)
      .then(response => {
        const { user } = response;
        this.props.updateUser(user);
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({
          emailValid: false,
          passwordValid: false
        });
      });
  };

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <LoginDiv>
          <LoginForm onSubmit={this.handleSubmit}>
            <Label isValid={this.state.emailValid}>
              {this.state.emailValid ? (
                <React.Fragment>Email</React.Fragment>
              ) : (
                <React.Fragment>E-mail not valid</React.Fragment>
              )}
            </Label>
            <Input
              type="text"
              id="email"
              name="email"
              isValid={this.state.emailValid}
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <Label isValid={this.state.passwordValid}>
              {this.state.passwordValid ? (
                <React.Fragment>Password</React.Fragment>
              ) : (
                <React.Fragment>Password not valid</React.Fragment>
              )}
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              isValid={this.state.passwordValid}
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <Input
              type="submit"
              value="Login"
              size="4rem"
              disabled={!isEnabled}
            />
          </LoginForm>
        </LoginDiv>
      </React.Fragment>
    );
  }
}
