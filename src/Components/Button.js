import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  display: inline-block;
  border: 0;
  color: black;
  text-decoration: none;
  font-size: ${props => (props.font_size ? props.font_size : '1.2rem')};
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${props => (props.color ? props.color : '#005d04')};
  }
`;

const Input = props => (
  <React.Fragment>
    <Button {...props}>{props.children}</Button>
  </React.Fragment>
);

export default Input;
