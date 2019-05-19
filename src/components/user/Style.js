import styled from 'styled-components';

export const Area = styled.div`
  margin: 0.5rem 4rem;
  padding: 1rem;
  background-color: rgb(78, 78, 78);
`;

export const Title = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
  color: #ecd018;
  margin-bottom: 1rem;
`;

export const Form = styled.div`
  border: 0.1rem dashed #ecd018;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export const Fields = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
  margin-bottom: 1rem;
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 20% auto;
  &:hover,
  &:focus {
    transition: 1s;
    color: #ecd018;
  }
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 1rem;
  justify-content: end;
`;

export const Table = styled.div`
  display: grid;
  grid-template-rows: auto;
  margin-top: 1rem;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  text-transform: uppercase;
  color: #ecd018;
  margin-bottom: 0.5rem;
  border-bottom: 0.1rem solid #ecd018;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #ecd018;
    /* background-color: #ecd018; */
    border: 0.1rem solid transparent;
  }
`;
