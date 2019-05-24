import React, { useContext, useState } from 'react';

import { Area, MessageRow, IconStyle, ButtonRow, Text, Button } from './Style';
import { ALERT_TYPE } from '../../lib/constants';
import { AlertContext } from '../../globalState';
import Icon from '../element/Icon';

const Alert = () => {
  const { text, type, reset } = useContext(AlertContext);

  const [color] = useState(() => {
    return type === ALERT_TYPE.SUCCESS
      ? 'darkgreen'
      : type === ALERT_TYPE.WARNING
      ? 'darkyellow'
      : 'darkred';
  });
  const [backgroundColor] = useState(() => {
    return type === ALERT_TYPE.SUCCESS
      ? 'rgb(161, 207, 90)'
      : type === ALERT_TYPE.WARNING
      ? '#ecd018'
      : 'rgb(242, 154, 152)';
  });

  setTimeout(() => {
    reset();
  }, 5000);

  return (
    <Area color={color} backgroundColor={backgroundColor}>
      <MessageRow>
        <IconStyle>
          {type === ALERT_TYPE.SUCCESS ? (
            <Icon icon="faCheckCircle" />
          ) : type === ALERT_TYPE.WARNING ? (
            <Icon icon="faExclamationCircle" />
          ) : (
            <Icon icon="faTimes" />
          )}
        </IconStyle>
        <Text color={color}>{text}</Text>
        <ButtonRow>
          <Button
            color={color}
            backgroundColor={backgroundColor}
            show={true}
            onClick={() => {
              reset();
            }}
          >
            <Icon icon="faTimes" />
          </Button>
        </ButtonRow>
      </MessageRow>
    </Area>
  );
};

export default Alert;
