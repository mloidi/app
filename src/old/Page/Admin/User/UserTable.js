import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen,
  faSave,
  faEraser
} from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../../../Service/data.service';
import Label from '../../../Components/Label';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import Alert from '../../../Components/Message';

const UserTableHeader = styled.div`
  display: grid;
  grid-template-columns: 16% 16% 16% 16% 16% 16%;
  font-size: 1.2rem;
  border-bottom: 0.1rem solid lightgray;
  padding-bottom: 0.5rem;
`;

const UserTableRow = styled.div`
  display: grid;
  grid-template-columns: 16% 16% 16% 16% 16% 16%;
  border-bottom: 0.1rem solid lightgray;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
  background-color: ${props => (props.selected ? '#e9f5ed' : 'transparent')};
  &:hover {
    cursor: pointer;
    background-color: #e9f5ed;
    color: green !important;
  }
`;

const UserTableCell = styled.div`
  /* display: grid;
  grid-template-columns: 10% 10%;
  align-content: start; */
`;

const UserEditForm = styled.form`
  display: grid;
  grid-template-columns: 16% 16% 16% 16% 16% 16%;
  grid-column-gap: 0.5rem;
  align-items: center;
  justify-items: center;
  margin-top: 0.5rem;
`;

export default class UserTable extends Component {
  state = {
    users: {},
    name: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    userToEdit: null,
    showAlert: false,
    alert: ''
  };

  componentDidMount() {
    this.getUsers();
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.userToEdit) {
      this.editUser();
    } else {
      this.addUser();
    }
  };

  addUser = async () => {
    const userToAdd = {
      name: this.state.name,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };
    await UserService.addUser(userToAdd)
      .then(user => {
        this.showAlert(user.name + ' added successfully!!');
        this.getUsers();
      })
      .catch(error => {
        console.error(error);
      });
  };

  editUser = async () => {
    const userToAdd = { ...this.state.userToEdit };
    userToAdd.name = this.state.name;
    userToAdd.firstName = this.state.firstName;
    userToAdd.lastName = this.state.lastName;
    userToAdd.userName = this.state.userName;
    userToAdd.email = this.state.email;
    userToAdd.password = this.state.password;

    await UserService.editUser(userToAdd)
      .then(user => {
        this.showAlert(user.name + ' edited successfully!!');
        this.getUsers();
      })
      .catch(error => {
        console.log(error);
      });
  };

  getUsers = async () => {
    await UserService.getUsers()
      .then(users => {
        this.cleanForm();
        this.setState({
          users
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteUser = async user => {
    await UserService.deleteUser(user._id)
      .then(() => {
        this.showAlert(user.name + ' deleted successfully!!');
        this.getUsers();
      })
      .catch(error => {
        console.log(error);
      });
  };

  fillFormWithUserToEdit = userToEdit => {
    if (this.state.userToEdit && this.state.userToEdit._id === userToEdit._id) {
      this.cleanForm();
    } else {
      this.closeAlert();
      this.setState({
        userToEdit,
        name: userToEdit.name,
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        userName: userToEdit.userName,
        email: userToEdit.email,
        password: userToEdit.password
      });
    }
  };

  cleanForm = () => {
    this.setState({
      name: '',
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      userToEdit: null
    });
  };

  showAlert = alert => {
    this.setState({
      showAlert: true,
      alert
    });
  };

  closeAlert = alert => {
    this.setState({
      showAlert: false,
      alert: ''
    });
  };

  render() {
    return (
      <React.Fragment>
        <h2>User's</h2>
        <h3>New User</h3>
        {this.state.showAlert && (
          <Alert showAlert={this.state.showAlert} closeAlert={this.closeAlert}>
            {this.state.alert}
          </Alert>
        )}
        <UserEditForm onSubmit={this.handleSubmit} id="formUser">
          <Label isValid={true}>Name</Label>
          <Label isValid={true}>First Name</Label>
          <Label isValid={true}>Last Name</Label>
          <Label isValid={true}>User Name</Label>
          <Label isValid={true}>Email</Label>
          <Label isValid={true}>Add new user</Label>
          <Input
            type="text"
            id="name"
            name="name"
            isValid={true}
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <Input
            type="text"
            id="firstName"
            name="firstName"
            isValid={true}
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
          <Input
            type="text"
            id="lastName"
            name="lastName"
            isValid={true}
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
          <Input
            type="text"
            id="userName"
            name="userName"
            isValid={true}
            value={this.state.userName}
            onChange={this.handleInputChange}
          />
          <Input
            type="email"
            id="email"
            name="email"
            isValid={true}
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <div>
            <Button type="submit" form="formUser" font_size="1.5rem">
              <FontAwesomeIcon icon={faSave} />
            </Button>
            <Button font_size="1.5rem" onClick={() => this.cleanForm()}>
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          </div>
        </UserEditForm>
        <h3>All the User</h3>
        <UserTableHeader>
          <UserTableCell>Name</UserTableCell>
          <UserTableCell>First Name</UserTableCell>
          <UserTableCell>Last Name</UserTableCell>
          <UserTableCell>User Name</UserTableCell>
          <UserTableCell>Email</UserTableCell>
          <UserTableCell>Actions</UserTableCell>
        </UserTableHeader>
        {this.state.users.length > 0 ? (
          Object.keys(this.state.users).map(key => (
            <React.Fragment key={key}>
              <UserTableRow
                selected={
                  this.state.userToEdit &&
                  this.state.users[key]._id === this.state.userToEdit._id
                }
                onClick={() =>
                  this.fillFormWithUserToEdit(this.state.users[key])
                }
              >
                <UserTableCell>{this.state.users[key].name}</UserTableCell>
                <UserTableCell>{this.state.users[key].firstName}</UserTableCell>
                <UserTableCell>{this.state.users[key].lastName}</UserTableCell>
                <UserTableCell>{this.state.users[key].userName}</UserTableCell>
                <UserTableCell>{this.state.users[key].email}</UserTableCell>
                <UserTableCell>
                  <Button
                    color="red"
                    onClick={() => this.deleteUser(this.state.users[key])}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button
                    onClick={() =>
                      this.fillFormWithUserToEdit(this.state.users[key])
                    }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                </UserTableCell>
              </UserTableRow>
            </React.Fragment>
          ))
        ) : (
          <UserTableRow>
            <p>No data to show</p>
          </UserTableRow>
        )}
      </React.Fragment>
    );
  }
}
