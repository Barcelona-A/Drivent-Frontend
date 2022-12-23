import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicket from '../../hooks/api/useTicket';
import TicketPayment from '../../pages/Dashboard/Tickets';
import ErrorMessage from '../Commons/ErrorMessage';
import ConfirmedPayment from './ConfirmedPayment';
import PaymentForm from './PaymentForm';
import TicketSummary from './TicketSummary';

export default function PaymentOutcomes() {
  const { enrollment } = useEnrollment();
  const { ticket, getTicket } = useTicket();
  const [refreshTciket, setRefreshTicket] = useState(false);

  useEffect(() => {
    getTicket()
      .catch(() => {
        return;
      });
  }, [ticket?.status, refreshTciket]);

  return (
    <>
      <Title>Ingresso e Pagamento</Title>
      {!enrollment ? 
        <ErrorMessage 
          title={'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso'}
        /> 
        : 
        !ticket ? 
          <TicketPayment 
            refreshTicket={refreshTciket}
            setRefreshTicket={setRefreshTicket}
          />
          : 
          ticket.status === 'PAID' ? 
            <>
              <TicketSummary
                isRemote={ticket.TicketType.isRemote}
                includesHotel={ticket.TicketType.includesHotel}
                price={ticket.TicketType.price}
              />
              <ConfirmedPayment/> 
            </>
            
            : 
            <>
              <TicketSummary
                isRemote={ticket.TicketType.isRemote}
                includesHotel={ticket.TicketType.includesHotel}
                price={ticket.TicketType.price}
              />
              <PaymentForm 
                ticketId={ticket.id}
                value={ticket.TicketType.price}
                refreshTicket={refreshTciket}
                setRefreshTicket={setRefreshTicket}
              />
            </>
      } 
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
