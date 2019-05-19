import React from 'react';
import styled from 'styled-components';

const InputText = styled.input`
  display: ${props => (props.show ? 'block' : 'none')};
  border: none;
  color: white;
  border-bottom: 2px solid ${props => (props.isValid ? '#ccc' : 'red')};
  text-align: start;
  padding: 0 0.2rem 0.3rem 0.2rem;
  font-size: 1rem;
  margin: 0;
  background-color: transparent;
  &:hover,
  &:focus {
    outline: none;
    transition: 1s;
    border-color: ${props => (props.isValid ? '#ecd018' : 'red')};
  }
`;

const InputCheckBox = styled.div`
  display: block;
  position: relative;
  padding-left: 1.5rem;
  &:hover input ~ .checkmark {
    border: 0.1rem solid #ecd018;
  }
  .inputCheckBox {
    position: absolute;
    left: 0;
    opacity: 0;
    cursor: pointer;
    height: 1rem;
    width: 2rem;
    z-index: 1;
  }
  .checkmark {
    position: absolute;
    left: 0;
    border: 0.1rem solid transparent;
    height: 1rem;
    width: 1rem;
    background-color: transparent;
    cursor: pointer;
    transition: border 0.5s, background-color 0.5s;
    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 0.2rem;
      top: -0.1rem;
      width: 0.3rem;
      height: 0.8rem;
      border: solid #ecd018;
      border-width: 0 0.2rem 0.2rem 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  .uncheckmark {
    position: absolute;
    left: 0;
    border: 0.1rem solid transparent;
    height: 1rem;
    width: 1rem;
    background-color: transparent;
    cursor: pointer;
    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 0;
      top: 0.4rem;
      width: 1rem;
      height: 0.8rem;
      border: solid red;
      border-width: 0.2rem 0 0 0;
    }
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
  input:not(:checked) ~ .uncheckmark:after {
    display: block;
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
  margin: 0;
  padding: 0.5rem;
  font-size: 1rem;
  :focus {
    outline: none;
    transition: 0.5s;
    border-color: ${props => (props.isValid ? '#ecd018' : 'red')};
    border-left: 1px solid ${props => (props.isValid ? '#ecd018' : 'red')};
    border-right: 1px solid ${props => (props.isValid ? '#ecd018' : 'red')};
    border-top: 1px solid ${props => (props.isValid ? '#ecd018' : 'red')};
  }
`;

const InputSubmit = styled.input`
  background-color: ${props => (props.disabled ? 'lightgray' : '#ecd018')};
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
    {(props.type === 'text' || props.type === 'number') && (
      <InputText {...props} />
    )}
    {props.type === 'password' && <InputText {...props} />}
    {props.type === 'email' && <InputText {...props} />}
    {props.type === 'checkbox' && (
      <InputCheckBox>
        <input className="inputCheckBox" {...props} />
        <span className="checkmark" />
        <span className="uncheckmark" />
        {props.label}
      </InputCheckBox>
    )}
    {props.type === 'textarea' && <InputTextArea {...props} />}
    {props.type === 'submit' && (
      <InputSubmit {...props}>{props.children}</InputSubmit>
    )}
  </React.Fragment>
);

export default Input;
