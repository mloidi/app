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

import { ItemTypeService } from '../../../Service/data.service';
import Label from '../../../Components/Label';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import Alert from '../../../Components/Message';

const ItemTypeTableHeader = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  font-size: 1.2rem;
  border-bottom: 0.1rem solid lightgray;
  padding-bottom: 0.5rem;
`;

const ItemTypeTableRow = styled.div`
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

const ItemTypeTableCell = styled.div`
  /* display: grid;
  grid-template-columns: 10% 10%;
  align-content: start; */
`;

const ItemTypeEditForm = styled.form`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-column-gap: 0.5rem;
  align-items: center;
  justify-items: center;
  margin-top: 0.5rem;
`;

export default class ItemTypeTable extends Component {
  state = {
    itemTypes: {},
    name: '',
    description: '',
    isPublic: false,
    itemTypeToEdit: null,
    showAlert: false,
    alert: ''
  };

  componentDidMount() {
    this.getItemTypes();
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
    if (this.state.itemTypeToEdit) {
      this.editItemType();
    } else {
      this.addItemType();
    }
  };

  addItemType = async () => {
    const itemTypeToAdd = {
      name: this.state.name,
      description: this.state.description,
      isPublic: this.state.isPublic
    };
    await ItemTypeService.addItemType(itemTypeToAdd)
      .then(itemType => {
        this.showAlert(itemType.name + ' added successfully!!');
        this.getItemTypes();
      })
      .catch(error => {
        console.log(error);
      });
  };

  editItemType = async () => {
    const itemTypeToAdd = { ...this.state.itemTypeToEdit };
    itemTypeToAdd.name = this.state.name;
    itemTypeToAdd.description = this.state.description;
    itemTypeToAdd.isPublic = this.state.isPublic;

    await ItemTypeService.editItemType(itemTypeToAdd)
      .then(itemType => {
        this.showAlert(itemType.name + ' edited successfully!!');
        this.getItemTypes();
      })
      .catch(error => {
        console.log(error);
      });
  };

  getItemTypes = async () => {
    await ItemTypeService.getItemTypes()
      .then(itemTypes => {
        this.cleanForm();
        this.setState({
          itemTypes
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteItemType = async itemType => {
    await ItemTypeService.deleteItemType(itemType._id)
      .then(() => {
        this.showAlert(itemType.name + ' deleted successfully!!');
        this.getItemTypes();
      })
      .catch(error => {
        console.log(error);
      });
  };

  fillFormWithItemTypeToEdit = itemTypeToEdit => {
    if (
      this.state.itemTypeToEdit &&
      this.state.itemTypeToEdit._id === itemTypeToEdit._id
    ) {
      this.cleanForm();
    } else {
      this.closeAlert();
      this.setState({
        itemTypeToEdit,
        name: itemTypeToEdit.name,
        description: itemTypeToEdit.description,
        isPublic: itemTypeToEdit.isPublic
      });
    }
  };

  cleanForm = () => {
    this.setState({
      name: '',
      description: '',
      isPublic: false,
      itemTypeToEdit: null
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
        <h2>ItemType's</h2>
        <h3>New ItemType</h3>
        {this.state.showAlert && (
          <Alert showAlert={this.state.showAlert} closeAlert={this.closeAlert}>
            {this.state.alert}
          </Alert>
        )}
        <ItemTypeEditForm
          onSubmit={this.handleSubmit}
          id="formItemType"
        >
          <Label isValid={true}>Name</Label>
          <Label isValid={true}>Description</Label>
          <Label isValid={true}>Public</Label>
          <Label isValid={true}>Add new itemType</Label>
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
            <Button type="submit" form="formItemType" font_size="1.5rem">
              <FontAwesomeIcon icon={faSave} />
            </Button>
            <Button font_size="1.5rem" onClick={() => this.cleanForm()}>
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          </div>
        </ItemTypeEditForm>
        <h3>All the ItemType</h3>
        <ItemTypeTableHeader>
          <ItemTypeTableCell>Name</ItemTypeTableCell>
          <ItemTypeTableCell>Description</ItemTypeTableCell>
          <ItemTypeTableCell>Public</ItemTypeTableCell>
          <ItemTypeTableCell>Actions</ItemTypeTableCell>
        </ItemTypeTableHeader>
        {this.state.itemTypes.length > 0 ? (
          Object.keys(this.state.itemTypes).map(key => (
            <React.Fragment key={key}>
              <ItemTypeTableRow
                selected={
                  this.state.itemTypeToEdit &&
                  this.state.itemTypes[key]._id ===
                    this.state.itemTypeToEdit._id
                }
                onClick={() =>
                  this.fillFormWithItemTypeToEdit(
                    this.state.itemTypes[key]
                  )
                }
              >
                <ItemTypeTableCell>
                  {this.state.itemTypes[key].name}
                </ItemTypeTableCell>
                <ItemTypeTableCell>
                  {this.state.itemTypes[key].description}
                </ItemTypeTableCell>
                <ItemTypeTableCell>
                  {this.state.itemTypes[key].isPublic ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} />
                  )}
                </ItemTypeTableCell>
                <ItemTypeTableCell>
                  <Button
                    color="red"
                    onClick={() =>
                      this.deleteItemType(this.state.itemTypes[key])
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button
                    onClick={() =>
                      this.fillFormWithItemTypeToEdit(
                        this.state.itemTypes[key]
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                </ItemTypeTableCell>
              </ItemTypeTableRow>
            </React.Fragment>
          ))
        ) : (
          <ItemTypeTableRow>
            <p>No data to show</p>
          </ItemTypeTableRow>
        )}
      </React.Fragment>
    );
  }
}
