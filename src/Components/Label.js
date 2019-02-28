import React from 'react';

import styled from 'styled-components';

const LabelStyle = styled.label`
  color: ${props => (!props.isValid ? 'red' : 'black')};
  text-align: start;
  margin: 0.5rem 0 0.5rem 0;
  font-size: 1rem;
  background-color: transparent;
`;

const Label = props => <LabelStyle {...props}>{props.children}</LabelStyle>;

export default Label;
