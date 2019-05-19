import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Area, Title, NoError, Error, ButtonRow } from './Style';
import { Button } from '../../css/GlobalStyle';
import { AuthContext } from '../../globalState';
import Input from '../element/Input';
import Icon from '../element/Icon';

export const Login = () => {
  const { logIn, isUsernameValid, isPasswordValid, message } = useContext(
    AuthContext
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'username') {
      setUsername(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <Area>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Title>Login</Title>
      {message ? (
        <Error>
          <Icon icon="faTimes" />
          {message}
        </Error>
      ) : (
        <NoError> {'a'}</NoError>
      )}
      <Input
        type="text"
        id="username"
        name="username"
        show={true}
        isValid={isUsernameValid}
        placeholder="User name"
        value={username}
        onChange={handleInputChange}
      />
      <br />
      <Input
        type="password"
        id="password"
        name="password"
        show={true}
        isValid={isPasswordValid}
        placeholder="Password"
        value={password}
        onChange={handleInputChange}
      />
      <ButtonRow>
        <Button
          onClick={() => {
            logIn(username, password);
          }}
          show={true}
          disabled={!(username && password)}
        >
          <Icon icon="faSignInAlt" /> {' Log In'}
        </Button>
      </ButtonRow>
    </Area>
  );
};

export default Login;
