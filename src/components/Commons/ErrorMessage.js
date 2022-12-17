import styled from 'styled-components';

export default function ErrorMessage({ title }) {
  return (
    <ErrorMessageContainer>
      <h6>{title}</h6>
    </ErrorMessageContainer>
  );
}

const ErrorMessageContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  & h6 {
    max-width: 500px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    text-align: center;
    color: #8E8E8E;
  }
  
`;
