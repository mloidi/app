import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faTrash,
  faPen,
  faSave,
  faEraser
} from '@fortawesome/free-solid-svg-icons';

import { OrganizationService } from '../../../Service/data.service';
import Label from '../../../Components/Label';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import Alert from '../../../Components/Message';

const OrganizationTableHeader = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  font-size: 1.2rem;
  border-bottom: 0.1rem solid lightgray;
  padding-bottom: 0.5rem;
`;

const OrganizationTableRow = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
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

const OrganizationTableCell = styled.div`
  /* display: grid;
  grid-template-columns: 10% 10%;
  align-content: start; */
`;

const OrganizationEditForm = styled.form`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-column-gap: 0.5rem;
  align-items: center;
  justify-items: center;
  margin-top: 0.5rem;
`;

export default class OrganizationTable extends Component {
  state = {
    organizations: {},
    name: '',
    description: '',
    isPublic: false,
    organizationToEdit: null,
    showAlert: false,
    alert: ''
  };

  componentDidMount() {
    this.getOrganizations();
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
    if (this.state.organizationToEdit) {
      this.editOrganization();
    } else {
      this.addOrganization();
    }
  };

  cleanForm = () => {
    this.setState({
      name: '',
      description: '',
      isPublic: false,
      organizationToEdit: null
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

  fillFormWithOrganizationToEdit = organizationToEdit => {
    if (
      this.state.organizationToEdit &&
      this.state.organizationToEdit._id === organizationToEdit._id
    ) {
      this.cleanForm();
    } else {
      this.closeAlert();
      this.setState({
        organizationToEdit,
        name: organizationToEdit.name,
        description: organizationToEdit.description,
        isPublic: organizationToEdit.isPublic
      });
    }
  };

  // API functions
  getOrganizations = async () => {
    await OrganizationService.getOrganizations()
      .then(organizations => {
        this.cleanForm();
        this.setState({
          organizations
        });
      })
      .catch(error => {
        console.error(error);
        this.props.history.push('/');
      });
  };

  addOrganization = async () => {
    const organizationToAdd = {
      name: this.state.name,
      description: this.state.description,
      isPublic: this.state.isPublic
    };
    await OrganizationService.addOrganization(organizationToAdd)
      .then(organization => {
        this.showAlert(organization.name + ' added successfully!!');
        this.getOrganizations();
      })
      .catch(error => {
        console.error(error);
        this.props.history.push('/');
      });
  };

  editOrganization = async () => {
    const organizationToAdd = { ...this.state.organizationToEdit };
    organizationToAdd.name = this.state.name;
    organizationToAdd.description = this.state.description;
    organizationToAdd.isPublic = this.state.isPublic;

    await OrganizationService.editOrganization(organizationToAdd)
      .then(organization => {
        this.showAlert(organization.name + ' edited successfully!!');
        this.getOrganizations();
      })
      .catch(error => {
        console.error(error);
        this.props.history.push('/');
      });
  };

  deleteOrganization = async organization => {
    await OrganizationService.deleteOrganization(organization._id)
      .then(() => {
        this.showAlert(organization.name + ' deleted successfully!!');
        this.getOrganizations();
      })
      .catch(error => {
        console.error(error);
        this.props.history.push('/');
      });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Organization's</h2>
        <h3>New Organization</h3>
        {this.state.showAlert && (
          <Alert showAlert={this.state.showAlert} closeAlert={this.closeAlert}>
            {this.state.alert}
          </Alert>
        )}
        <OrganizationEditForm
          onSubmit={this.handleSubmit}
          id="formOrganization"
        >
          <Label isValid={true}>Name</Label>
          <Label isValid={true}>Description</Label>
          <Label isValid={true}>Public</Label>
          <Label isValid={true}>Add new organization</Label>
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
            id="description"
            name="description"
            isValid={true}
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <Input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            isValid={true}
            checked={this.state.isPublic}
            onChange={this.handleInputChange}
          />
          <div>
            <Button type="submit" form="formOrganization" font_size="1.5rem">
              <FontAwesomeIcon icon={faSave} />
            </Button>
            <Button font_size="1.5rem" onClick={() => this.cleanForm()}>
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          </div>
        </OrganizationEditForm>
        <h3>All the Organization</h3>
        <OrganizationTableHeader>
          <OrganizationTableCell>Name</OrganizationTableCell>
          <OrganizationTableCell>Description</OrganizationTableCell>
          <OrganizationTableCell>Public</OrganizationTableCell>
          <OrganizationTableCell>Actions</OrganizationTableCell>
        </OrganizationTableHeader>
        {this.state.organizations.length > 0 ? (
          Object.keys(this.state.organizations).map(key => (
            <React.Fragment key={key}>
              <OrganizationTableRow
                selected={
                  this.state.organizationToEdit &&
                  this.state.organizations[key]._id ===
                    this.state.organizationToEdit._id
                }
                onClick={() =>
                  this.fillFormWithOrganizationToEdit(
                    this.state.organizations[key]
                  )
                }
              >
                <OrganizationTableCell>
                  {this.state.organizations[key].name}
                </OrganizationTableCell>
                <OrganizationTableCell>
                  {this.state.organizations[key].description}
                </OrganizationTableCell>
                <OrganizationTableCell>
                  {this.state.organizations[key].isPublic ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} />
                  )}
                </OrganizationTableCell>
                <OrganizationTableCell>
                  <Button
                    color="red"
                    onClick={() =>
                      this.deleteOrganization(this.state.organizations[key])
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button
                    onClick={() =>
                      this.fillFormWithOrganizationToEdit(
                        this.state.organizations[key]
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                </OrganizationTableCell>
              </OrganizationTableRow>
            </React.Fragment>
          ))
        ) : (
          <OrganizationTableRow>
            <p>No data to show</p>
          </OrganizationTableRow>
        )}
      </React.Fragment>
    );
  }
}
