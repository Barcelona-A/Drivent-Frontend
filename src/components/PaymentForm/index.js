import styled from 'styled-components';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicket from '../../hooks/api/useTicket';
import ErrorMessage from '../Commons/ErrorMessage';
import ConfirmedPayment from './ConfirmedPayment';

export default function PaymentForm() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();

  return (
    <>
      <Title>Ingresso e Pagamento</Title>
      {!enrollment ? //SEM ENROLLMENT
        <ErrorMessage 
          title={'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso'}
        /> 
        : 
        !ticket ? //SEM TICKET
          <div>sem ticket Página do Daivison</div> 
          : 
          ticket.status === 'PAID' ? //TICKET PAGO
            <ConfirmedPayment/> 
            : //TICKET RESERVADO
            <div>Com ticket Reservado pagina da Cecilia</div>} 
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
