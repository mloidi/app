import React from 'react';
import styled from 'styled-components';

const InputText = styled.input`
  border: none;
  border-radius: 0.2rem;
  border-bottom: 2px solid ${props => (props.isValid ? '#ccc' : 'red')};
  border-left: 1px solid ${props => (props.isValid ? '#ccc' : 'red')};
  border-right: 1px solid ${props => (props.isValid ? '#ccc' : 'red')};
  border-top: 1px solid ${props => (props.isValid ? '#ccc' : 'red')};
  text-align: start;
  margin-top: 0.5rem;
  padding: 0.2rem;
  font-size: 1rem;
  background-color: transparent;
  :focus {
    outline: none;
    transition: 0.5s;
    border-color: ${props => (props.isValid ? '#005d04' : 'red')};
    border-left: 1px solid ${props => (props.isValid ? '#005d04' : 'red')};
    border-right: 1px solid ${props => (props.isValid ? '#005d04' : 'red')};
    border-top: 1px solid ${props => (props.isValid ? '#005d04' : 'red')};
  }
`;

const InputCheckBox = styled.input`
  border: none;
  border-radius: 0.2rem;
  border-bottom: 2px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  text-align: start;
  margin: 0;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: transparent;
  :focus {
    outline: none;
    transition: 0.5s;
    border-color: #005d04;
    border-left: 1px solid #005d04;
    border-right: 1px solid #005d04;
    border-top: 1px solid #005d04;
  }
`;

const InputTextArea = styled.textarea`
  border: none;
  border-radius: 0.2rem;
  border-bottom: 2px solid ${props => (props.isValid ? '#ccc' : 'red')};
  border-left: 1px solid ${props => (props.isValid ? '#ccc' : 'red')};
  border-right: 1px solid ${props => (props.isValid ? '#ccc' : 'red')};
  border-top: 1px solid ${props => (props.isValid ? '#ccc' : 'red')};
  text-align: start;
  margin: 0 0.5rem 0.5rem 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: transparent;
  :focus {
    outline: none;
    transition: 0.5s;
    border-color: ${props => (props.isValid ? '#005d04' : 'red')};
    border-left: 1px solid ${props => (props.isValid ? '#005d04' : 'red')};
    border-right: 1px solid ${props => (props.isValid ? '#005d04' : 'red')};
    border-top: 1px solid ${props => (props.isValid ? '#005d04' : 'red')};
  }
`;

const InputSubmit = styled.input`
  background-color: ${props => (props.disabled ? 'lightgray' : '#005d04')};
  padding: 0.5rem;
  margin: 0.2rem 5rem 0 5rem;
  width: ${props => props.size};
  display: inline-block;
  border: 0;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover,
  &:focus {
    outline: none;
    border-bottom: 1px white solid;
    &:after {
      width: calc(100% - 60px);
    }
  }
`;

const Input = props => (
  <React.Fragment>
    {(props.type === 'text' || props.type === 'number') && <InputText {...props} />}
    {props.type === 'password' && <InputText {...props} />}
    {props.type === 'email' && <InputText {...props} />}
    {props.type === 'checkbox' && <InputCheckBox {...props} />}
    {props.type === 'textarea' && <InputTextArea {...props} />}
    {props.type === 'submit' && <InputSubmit {...props}>{props.children}</InputSubmit>}
  </React.Fragment>
);

export default Input;
