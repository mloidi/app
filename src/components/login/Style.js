import styled from 'styled-components';

export const Area = styled.div`
  display: grid;
  position: absolute;
  background-color: rgb(78, 78, 78);
  width: 50%;
  left: 25%;
  top: 25%;
  padding: 1rem;
  border: 0.1rem solid #ecd018;
  z-index: 10;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
  text-align: center;
`;

export const Error = styled.div`
  color: darkred;
  background-color: rgb(242, 154, 152);
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0.1rem dashed darkred;
  padding: 0.5rem;
  display: inline-grid;
  grid-template-columns: auto auto;
  justify-content: start;
  grid-gap: 1rem;
`;

export const NoError = styled.div`
  color: transparent;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0.2rem dashed transparent;
  padding: 0.5rem;
`;

export const ButtonRow = styled.div`
  display: inline-grid;
  justify-content: end;
  margin-top: 1rem;
`;
