import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';

import {
  Area,
  Title,
  Form,
  Fields,
  Field,
  Buttons,
  Table,
  Header,
  Row
} from './Style';
import { Button } from '../../css/GlobalStyle';
import { AuthContext } from '../../globalState';
import { UserService } from '../../service/user.service';
import Input from '../element/Input';
import Icon from '../element/Icon';

export default function User() {
  const { token } = useContext(AuthContext);

  const [tableHeader] = useState(() => {
    return ['first name', 'last name', 'username', 'email', ''];
  });

  const [users, setUsers] = useState([]);

  const [userId, setUserId] = useState(null);
  const [firstName, setFirsName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (users.length === 0) {
    UserService.getUsers(token)
      .then(response => {
        console.log(response);
        setUsers(response);
      })
      .catch(error => console.error(error));
  }

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'firstName') {
      setFirsName(value);
    }
    if (name === 'lastName') {
      setLastName(value);
    }
    if (name === 'userName') {
      setUserName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  return (
    <Area>
      <Helmet>
        <title>User</title>
      </Helmet>
      <Title>User</Title>
      <Form>
        <Fields>
          <Field>
            First Name:
            <Input
              type="text"
              id="firstName"
              name="firstName"
              show={true}
              isValid={true}
              value={firstName}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            Last Name:
            <Input
              type="text"
              id="lastName"
              name="lastName"
              show={true}
              isValid={true}
              value={lastName}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            User Name:
            <Input
              type="text"
              id="userName"
              name="userName"
              show={true}
              isValid={true}
              value={userName}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            Email:
            <Input
              type="text"
              id="email"
              name="email"
              show={true}
              isValid={true}
              value={email}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            Password:
            <Input
              type="text"
              id="password"
              name="password"
              show={true}
              isValid={true}
              value={password}
              onChange={handleInputChange}
            />
          </Field>
        </Fields>
        <Buttons>
          {userId ? (
            <React.Fragment>
              <Button show={true}>
                <Icon icon="faUserEdit" /> {' edit User'}
              </Button>
              <Button show={true}>
                <Icon icon="faUserMinus" /> {' delete User'}
              </Button>
            </React.Fragment>
          ) : (
            <Button show={true}>
              <Icon icon="faUserPlus" /> {' new User'}
            </Button>
          )}
          <Button
            show={true}
            onClick={() => {
              setUserId(null);
              setFirsName('');
              setLastName('');
              setUserName('');
              setEmail('');
              setPassword('');
            }}
          >
            <Icon icon="faTimes" /> {' Clean'}
          </Button>
        </Buttons>
      </Form>
      <Table>
        <Header>
          {tableHeader.map(tableHeader => (
            <div key={tableHeader}>{tableHeader}</div>
          ))}
        </Header>
        {users.map(user => (
          <Row
            key={user._id}
            onClick={() => {
              setUserId(user._id);
              setFirsName(user.firstName);
              setLastName(user.lastName);
              setUserName(user.userName);
              setEmail(user.email);
            }}
          >
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.userName}</div>
            <div>{user.email}</div>
          </Row>
        ))}
      </Table>
    </Area>
  );
}
