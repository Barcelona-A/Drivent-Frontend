import styled from 'styled-components';

export const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  background-color: #FFEED2;
  flex-wrap: wrap;
  padding: 2rem 0;
  border-radius: 20px;
  margin-top: 1rem;
  /* font-size: 16px; */
  font-family: 'Roboto', sans-serif;
  text-transform: capitalize;
  
  > span:nth-child(2) {
    margin-top: 1rem;
    color: #898989;
  }

  @media (max-width: 900px) and (min-width: 600.10px) {
    width: 45%;
  } 

  @media (max-width: 600px) {
    width: 100%;
    padding-left: 0px !important;
  } 
`;
