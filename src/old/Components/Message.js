import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

const AlertDiv = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  align-items: center;
  font-size: 0.9rem;
  background-color: #e9f5ed;
  color: green;
  border: 0.2rem solid green;
  padding: 2rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 400px;
`;

const IconDiv = styled.div`
  font-size: 1.2rem;
`;

const duration = 300;

const defaultStyle = {
  transform: 'scale(1)',
  transition: `all ${duration}ms ease-in-out`
};

const transitionStyles = {
  entering: { transform: 'scale(0)' },
  entered: { transform: 'scale(1)' },
  exiting: { transform: 'scale(1)' },
  exited: { transform: 'scale(0)' }
};

const Alert = ({ children, showAlert, closeAlert, type, ...props }) => (
  <Transition in={showAlert} timeout={duration} appear={true} unmountOnExit>
    {state => (
      <AlertDiv
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        <IconDiv>
          <FontAwesomeIcon icon={faCheckCircle} />
        </IconDiv>
        <div>{children}</div>
        <Button onClick={() => closeAlert()}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>
      </AlertDiv>
    )}
  </Transition>
);

export default Alert;
