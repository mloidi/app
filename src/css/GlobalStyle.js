import styled from 'styled-components';

export const Button = styled.button`
  display: ${props => (props.show ? 'block' : 'none')};
  font-size: 1rem;
  color: #ecd018;
  background-color: transparent;
  cursor: pointer;
  border: 0.1rem solid #ecd018;
  padding: 0.5rem;
  transition: color 0.5s, background-color 0.5s;
  &:hover,
  &:focus {
    color: rgb(78, 78, 78);
    background-color: #ecd018;
    border: 0.1rem solid #ecd018;
  }
`;
