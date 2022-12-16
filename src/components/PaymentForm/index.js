import styled from 'styled-components';

export default function PaymentForm() {
  return (
    <>
      <Title>Ingresso e Pagamento</Title>
      <ErrorMessageContainer>
        <h6>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</h6>
      </ErrorMessageContainer>
    </>
  ); 
};

const Title = styled.h1`
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    color: #000000;
`;

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

