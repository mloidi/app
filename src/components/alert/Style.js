import styled from 'styled-components';

export const Area = styled.div`
  display: grid;
  position: absolute;
  background-color: ${props => props.backgroundColor};
  width: 50%;
  left: 50%;
  top: 90%;
  color: ${props => props.color};
  border: 0.1rem solid ${props => props.color};
  z-index: 10;
`;

export const MessageRow = styled.div`
  display: grid;
  grid-template-columns: 5% auto 5%;
  margin: 1rem;
  grid-gap: 1rem;
`;

export const ButtonRow = styled.div`
  display: inline-grid;
  grid-template-columns: auto;
  justify-content: end;
`;

export const IconStyle = styled.div`
  font-size: 2rem;
`;

export const Text = styled.div`
  color: ${props => props.color};
`;

export const Button = styled.button`
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  color: ${props => props.color};
  border: 0.1rem solid ${props => props.color};
  transition: color 0.5s, background-color 0.5s;
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${props => props.backgroundColor};
    background-color: ${props => props.color};
    border: 0.1rem solid ${props => props.color};
  }
`;
