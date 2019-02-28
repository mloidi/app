import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import { SkillService } from '../../../Service/data.service';
import Label from '../../../Components/Label';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';

const SkillEditForm = styled.form`
  display: grid;
  grid-template-columns: 16% 16% 16% 16% 16% 16%;
  grid-column-gap: 0.5rem;
  align-items: center;
  justify-items: center;
  margin-top: 0.5rem;
`;

export default class SkillForm extends Component {
  state = {
    name: '',
    description: '',
    level: '',
    URL: '',
    isPublic: false,
    skillToEdit: null
  };

  componentWillReceiveProps() {
    console.log(this.props.skillIdEdit)
    const skillIdEdit = this.props.skillIdEdit;
    if (skillIdEdit) {
      this.getSkill(skillIdEdit);
    }
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
    if (this.props.skillToEdit) {
      this.editSkill();
    } else {
      this.addSkill();
    }
  };

  getSkill = async skillIdEdit => {
    await SkillService.getSkill(skillIdEdit)
      .then(skillToEdit => {
        this.setState({
          skillToEdit
        });
        this.setState({
          name: this.state.skillToEdit.name,
          description: this.state.skillToEdit.description,
          level: this.state.skillToEdit.level,
          URL: this.state.skillToEdit.URL,
          isPublic: this.state.skillToEdit.isPublic
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  addSkill = async () => {
    const skillToAdd = {
      name: this.state.name,
      description: this.state.description,
      level: this.state.level,
      URL: this.state.URL,
      isPublic: this.state.isPublic
    };
    await SkillService.addSkill(skillToAdd)
      .then(skill => {
        this.props.refreshSkill(skill);

        this.setState({
          name: '',
          description: '',
          level: '',
          URL: '',
          isPublic: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  editSkill = async () => {
    const skillToAdd = { ...this.state.skillToEdit };
    skillToAdd.name = this.state.name;
    skillToAdd.description = this.state.description;
    skillToAdd.level = this.state.level;
    skillToAdd.URL = this.state.URL;
    skillToAdd.isPublic = this.state.isPublic;

    await SkillService.editSkill(skillToAdd)
      .then(skill => {
        this.props.refreshSkill(skill);

        this.setState({
          name: 'a',
          description: '',
          level: '',
          URL: '',
          isPublic: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <React.Fragment>
        <SkillEditForm onSubmit={this.handleSubmit} id="formSkill">
          <Label isValid={true}>Name</Label>
          <Label isValid={true}>Description</Label>
          <Label isValid={true}>Level</Label>
          <Label isValid={true}>URL</Label>
          <Label isValid={true}>Public</Label>
          <Label isValid={true}>Add new skill</Label>
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
            type="number"
            id="level"
            name="level"
            isValid={true}
            value={this.state.level}
            onChange={this.handleInputChange}
          />
          <Input
            type="text"
            id="URL"
            name="URL"
            isValid={true}
            value={this.state.URL}
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
          <Button type="submit" form="formSkill" font_size="1.5rem">
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </SkillEditForm>
      </React.Fragment>
    );
  }
}
