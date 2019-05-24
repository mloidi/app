import styled from 'styled-components';

export const Area = styled.div`
  background-color: ${props => props.theme.bgArea};
  padding: 1rem 2rem 0.5rem 2rem;
  border-bottom: 0.1rem solid ${props => props.theme.principalColor};
  display: grid;
  grid-template-columns: auto auto auto;
`;

export const LogoArea = styled.div`
  display: inline-grid;
  grid-template-columns: auto;
  justify-content: start;
  text-transform: uppercase;
  color: ${props => props.theme.principalColor};
  font-size: 2rem;
`;

export const MenuOptionsArea = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
`;

export const EndArea = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  align-content: center;
  grid-gap: 1rem;
`;


export const MenuBar = styled.ul`
  text-transform: uppercase;
  list-style-type: none;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  justify-content: center;
  grid-gap: 1rem;
  .link {
    background-color: transparent;
    padding: 0.5rem 1rem;
    color: white;
    text-decoration: none;
    border: 0.1rem solid ${props => props.theme.principalColor};
    transition: border 0.5s, color 0.5s;
    cursor: pointer;
    &:hover,
    &:focus {
      outline: none;
      color: ${props => props.theme.bgArea};
      background-color: ${props => props.theme.principalColor};
      border: 0.1rem solid ${props => props.theme.principalColor};
    }
}
.selected {
    outline: none;
    color: ${props => props.theme.bgArea};
    background-color: ${props => props.theme.principalColor};
    border: 0.1rem solid ${props => props.theme.principalColor};
    &:hover,
    &:focus {
      outline: none;
      color: ${props => props.theme.bgArea};
    }
  }
`;