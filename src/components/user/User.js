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
import { AuthContext, AlertContext } from '../../globalState';
import { UserService } from '../../service/user.service';
import Input from '../element/Input';
import Icon from '../element/Icon';

export default function User() {
  const { token } = useContext(AuthContext);
  const { sendError, sendSuccess } = useContext(AlertContext);

  const [tableHeader] = useState(() => {
    return ['first name', 'last name', 'username', 'email', ''];
  });

  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [userId, setUserId] = useState(null);
  const [firstName, setFirsName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [isValidUserName, setIsValidUserName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const getUsers = () => {
    UserService.getUsers(token)
      .then(response => {
        setUsers(response);
      })
      .catch(error => console.error(error));
  };

  if (users.length === 0) {
    getUsers();
  }

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'firstName') {
      setFirsName(value);
      setIsValidFirstName(true);
    }
    if (name === 'lastName') {
      setLastName(value);
      setIsValidLastName(true);
    }
    if (name === 'userName') {
      setUserName(value);
      setIsValidUserName(true);
    }
    if (name === 'email') {
      setEmail(value);
      setIsValidEmail(true);
    }
    if (name === 'password') {
      setPassword(value);
      setIsValidPassword(true);
    }
  };

  const save = isNew => {
    // Check if exists user with the same username or email
    const existsUser = users.find(user => {
      return (
        (isNew && (user.userName === userName || user.email === email)) ||
        (!isNew &&
          user._id !== userId &&
          (user.userName === userName || user.email === email))
      );
    });
    if (!existsUser || existsUser === undefined) {
      let allFieldsOK = true;
      if (firstName === '') {
        setIsValidFirstName(false);
        allFieldsOK = false;
      }
      if (lastName === '') {
        setIsValidLastName(false);
        allFieldsOK = false;
      }
      if (userName === '') {
        setIsValidUserName(false);
        allFieldsOK = false;
      }
      if (email === '') {
        setIsValidEmail(false);
        allFieldsOK = false;
      }
      if (isNew && password === '') {
        setIsValidPassword(false);
        allFieldsOK = false;
      }

      if (allFieldsOK) {
        const userToSave = {
          firstName,
          lastName,
          userName,
          email,
          password
        };
        if (!isNew) userToSave._id = userId;
        UserService.save(token, userToSave, isNew)
          .then(response => {
            getUsers();
            initForm();
            sendSuccess(response.userName + (isNew ? ' added' : ' edited'));
          })
          .catch(error => console.error(error));
      } else {
        sendError('no valid data');
      }
    } else {
      sendError('Already exists a user with the same email or username');
    }
  };

  const initForm = () => {
    setUserId(null);
    setFirsName('');
    setLastName('');
    setUserName('');
    setEmail('');
    setPassword('');
    setIsValidFirstName(true);
    setIsValidLastName(true);
    setIsValidUserName(true);
    setIsValidEmail(true);
    setIsValidPassword(true);
    setShowForm(false);
  };

  return (
    <Area>
      <Helmet>
        <title>User</title>
      </Helmet>
      <Title>User</Title>

      {!showForm ? (
        <React.Fragment>
          <Button
            show={true}
            onClick={() => {
              setShowForm(true);
            }}
          >
            <Icon icon="faUserPlus" /> {' new User'}
          </Button>
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
                  setShowForm(true);
                }}
              >
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
                <div>{user.userName}</div>
                <div>{user.email}</div>
              </Row>
            ))}
          </Table>
        </React.Fragment>
      ) : (
        <Form>
          <Fields>
            <Field isValid={isValidFirstName}>
              First Name:
              <Input
                type="text"
                id="firstName"
                name="firstName"
                show={true}
                isValid={isValidFirstName}
                value={firstName}
                onChange={handleInputChange}
              />
            </Field>
            <Field isValid={isValidLastName}>
              Last Name:
              <Input
                type="text"
                id="lastName"
                name="lastName"
                show={true}
                isValid={isValidLastName}
                value={lastName}
                onChange={handleInputChange}
              />
            </Field>
            <Field isValid={isValidUserName}>
              User Name:
              <Input
                type="text"
                id="userName"
                name="userName"
                show={true}
                isValid={isValidUserName}
                value={userName}
                onChange={handleInputChange}
              />
            </Field>
            <Field isValid={isValidEmail}>
              Email:
              <Input
                type="email"
                id="email"
                name="email"
                show={true}
                isValid={isValidEmail}
                value={email}
                onChange={handleInputChange}
              />
            </Field>
            <Field isValid={isValidPassword}>
              Password:
              <Input
                type="text"
                id="password"
                name="password"
                show={true}
                isValid={isValidPassword}
                value={password}
                onChange={handleInputChange}
              />
            </Field>
          </Fields>
          <Buttons>
            {userId ? (
              <React.Fragment>
                <Button
                  show={true}
                  onClick={() => {
                    save(false);
                  }}
                >
                  <Icon icon="faUserEdit" /> {' edit User'}
                </Button>
                <Button
                  show={true}
                  onClick={() => {
                    UserService.delete(token, userId).then(response => {
                      getUsers();
                      initForm();
                      sendSuccess(response.userName + ' deleted');
                    });
                  }}
                >
                  <Icon icon="faUserMinus" /> {' delete User'}
                </Button>
              </React.Fragment>
            ) : (
              <Button
                show={true}
                onClick={() => {
                  save(true);
                }}
              >
                <Icon icon="faUserPlus" /> {' new User'}
              </Button>
            )}
            <Button
              show={true}
              onClick={() => {
                initForm();
              }}
            >
              <Icon icon="faTimes" /> {' Cancel'}
            </Button>
          </Buttons>
        </Form>
      )}
    </Area>
  );
}
