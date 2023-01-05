import { SummaryWrapper } from './SummaryWrapper';
import { SubTitle } from '../../../layouts/Subtitle';

export default function TicketSummary({
  isRemote,
  includesHotel,
  price
}) {
  return (
    <>
      <SubTitle>Ingresso escolhido</SubTitle>
      <SummaryWrapper>
        <span>{isRemote ? 'remoto' : `presencial + ${includesHotel ? 'com hotel' : 'sem hotel'}`}</span>
        <span>{price ? `R$ ${price / 100}` : ''}</span>
      </SummaryWrapper>
    </>
  );
}
