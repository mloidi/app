import styled from 'styled-components';

export const Button = styled.button`
  display: ${props => (props.show ? 'block' : 'none')};
  font-size: 1rem;
  color: ${props => props.theme.principalColor};
  background-color: transparent;
  cursor: pointer;
  border: 0.1rem solid ${props => props.theme.principalColor};
  padding: 0.5rem;
  transition: color 0.5s, background-color 0.5s;
  &:hover,
  &:focus {
    color: ${props => props.theme.bgArea};
    background-color: ${props => props.theme.principalColor};
    border: 0.1rem solid ${props => props.theme.principalColor};
  }
`;
