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

import { SkillService } from '../../../Service/data.service';
// import SkillForm from './SkillForm';
import Label from '../../../Components/Label';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import Message from '../../../Components/Message';

const SkillTableHeader = styled.div`
  display: grid;
  grid-template-columns: 16% 16% 16% 16% 16% 16%;
  font-size: 1.2rem;
  border-bottom: 0.1rem solid lightgray;
  padding-bottom: 0.5rem;
`;

const SkillTableRow = styled.div`
  display: grid;
  grid-template-columns: 16% 16% 16% 16% 16% 16%;
  border-bottom: 0.1rem solid lightgray;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: ${props => (props.selected ? '#e9f5ed' : 'transparent')};
  &:hover {
    cursor: pointer;
    background-color: #e9f5ed;
    color: green !important;
  }
`;

const SkillTableCell = styled.div`
  /* display: grid;
  grid-template-columns: 10% 10%;
  align-content: start; */
`;

const SkillEditForm = styled.form`
  display: grid;
  grid-template-columns: 16% 16% 16% 16% 16% 16%;
  grid-column-gap: 0.5rem;
  align-items: center;
  justify-items: center;
  margin-top: 0.5rem;
`;

export default class SkillTable extends Component {
  state = {
    skills: {},
    name: '',
    description: '',
    level: '',
    URL: '',
    isPublic: false,
    skillToEdit: null,
    showMessage: false,
    message: ''
  };

  componentDidMount() {
    this.getSkills();
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
    if (this.state.skillToEdit) {
      this.editSkill();
    } else {
      this.addSkill();
    }
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
        this.getSkills();
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
        this.showMessage(skill.name + ' edited success!!');
        this.getSkills();
      })
      .catch(error => {
        console.log(error);
      });
  };

  getSkills = async () => {
    await SkillService.getSkills()
      .then(skills => {
        this.cleanForm();
        this.setState({
          skills
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteSkill = async skillId => {
    await SkillService.deleteSkill(skillId)
      .then(() => {
        this.getSkills();
      })
      .catch(error => {
        console.log(error);
      });
  };

  fillFormWithSkillToEdit = skillToEdit => {
    if (
      this.state.skillToEdit &&
      this.state.skillToEdit._id === skillToEdit._id
    ) {
      this.cleanForm();
    } else {
      this.closeMessage();
      this.setState({
        skillToEdit,
        name: skillToEdit.name,
        description: skillToEdit.description,
        level: skillToEdit.level,
        URL: skillToEdit.URL,
        isPublic: skillToEdit.isPublic
      });
    }
  };

  cleanForm = () => {
    this.setState({
      name: '',
      description: '',
      level: '',
      URL: '',
      isPublic: false,
      skillToEdit: null
    });
  };

  showMessage = message => {
    this.setState({
      showMessage: true,
      message
    });
  };

  closeMessage = message => {
    this.setState({
      showMessage: false,
      message: ''
    });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Skill's</h2>
        <h3>New Skill</h3>
        {this.state.showMessage && (
          <Message
            showMessage={this.state.showMessage}
            closeMessage={this.closeMessage}
          >
            {this.state.message}
          </Message>
        )}
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
          <div>
            <Button type="submit" form="formSkill" font_size="1.5rem">
              <FontAwesomeIcon icon={faSave} />
            </Button>
            <Button font_size="1.5rem" onClick={() => this.cleanForm()}>
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          </div>
        </SkillEditForm>
        <h3>All the Skill</h3>
        <SkillTableHeader>
          <SkillTableCell>Name</SkillTableCell>
          <SkillTableCell>Description</SkillTableCell>
          <SkillTableCell>Level</SkillTableCell>
          <SkillTableCell>URL</SkillTableCell>
          <SkillTableCell>Public</SkillTableCell>
          <SkillTableCell>Actions</SkillTableCell>
        </SkillTableHeader>
        {this.state.skills.length > 0 ? (
          Object.keys(this.state.skills).map(key => (
            <React.Fragment key={key}>
              <SkillTableRow
                selected={
                  this.state.skillToEdit &&
                  this.state.skills[key]._id === this.state.skillToEdit._id
                }
                onClick={() =>
                  this.fillFormWithSkillToEdit(this.state.skills[key])
                }
              >
                <SkillTableCell>{this.state.skills[key].name}</SkillTableCell>
                <SkillTableCell>
                  {this.state.skills[key].description}
                </SkillTableCell>
                <SkillTableCell>{this.state.skills[key].level}</SkillTableCell>
                <SkillTableCell>{this.state.skills[key].URL}</SkillTableCell>
                <SkillTableCell>
                  {this.state.skills[key].isPublic ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} />
                  )}
                </SkillTableCell>
                <SkillTableCell>
                  <Button
                    color="red"
                    onClick={() => this.deleteSkill(this.state.skills[key]._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button
                    onClick={() =>
                      this.fillFormWithSkillToEdit(this.state.skills[key])
                    }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                </SkillTableCell>
              </SkillTableRow>
            </React.Fragment>
          ))
        ) : (
          <SkillTableRow>
            <p>No data to show</p>
          </SkillTableRow>
        )}
      </React.Fragment>
    );
  }
}
