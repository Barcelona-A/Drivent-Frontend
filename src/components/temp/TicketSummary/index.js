import { SummaryWrapper } from './SummaryWrapper';
import styled from 'styled-components';

export default function TicketSummary({
  isRemote,
  includesHotel,
  price
}) {
  return (
    <>
      <TicketSummaryTitle>Ingresso escolhido</TicketSummaryTitle>
      <SummaryWrapper>
        <span>{isRemote ? 'remoto' : `presencial + ${includesHotel ? 'com hotel' : 'sem hotel'}`}</span>
        <span>{price ? `R$ ${price / 100}` : ''}</span>
      </SummaryWrapper>
    </>
  );
}

const TicketSummaryTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  color: #898989;
  font-size: 1.2rem;
`;
