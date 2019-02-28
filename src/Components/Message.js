import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

const MessageDiv = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  font-size: 0.9rem;
  background-color: #e9f5ed;
  color: green;
  border: 0.2rem solid green;
  padding: 1rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
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

const Message = ({ children, showMessage, closeMessage, type, ...props }) => (
  <Transition in={showMessage} timeout={duration} appear={true} unmountOnExit>
    {state => (
      <MessageDiv
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        {children}
        <Button onClick={() => closeMessage()}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>
      </MessageDiv>
    )}
  </Transition>
);

export default Message;
