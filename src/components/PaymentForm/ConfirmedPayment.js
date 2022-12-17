import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

export default function ConfirmedPayment() {
  return (
    <SuccessfulPayment>
      <h5>Pagamento</h5>
      <Check>
        <FaCheckCircle
          style={{
            color: '#36B853',
          }}
          size={50}
        />
        <SuccessfulPaymentMessage>
          <h3>Pagamento confirmado!</h3>
          <h4>Prossiga para escolha de hospedagem e atividades</h4>
        </SuccessfulPaymentMessage>
      </Check>
    </SuccessfulPayment>
  );
}

const SuccessfulPayment = styled.div`
    height: 90px;
    margin-top: 10px;

    & h5 {
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        color: #8E8E8E;
        margin-bottom: 15px;
    }
`; 

const Check = styled.div`
    height: 80%;
    display: flex;
    align-items: center;
`;

const SuccessfulPaymentMessage = styled.div`
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
    margin-left: 20px;

    & h4 {
        font-weight: 400;
    }

    h3 {
        font-weight: 700;
        margin-bottom: 5px;
    }
`;
