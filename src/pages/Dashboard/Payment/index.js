import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { searchTikets } from '../../../services/ticketsApi';

let number = -1;

function TemplateTicket({ id, name, price, setSelectTicket, selectTicket }) {
  function selectTicket() {
    setSelectTicket(id);
    number = id;

    console.log(number, id, selectTicket);
  };
  return (
    <TicketModality className="ticketModality" onClick={selectTicket} id={id}>
      <Modality className="typo">{name}</Modality>
      <Price className="price">R$ {price/100}</Price>
    </TicketModality>
  );
}

export default function Payment() {
  const [ticket, setTicket] = useState([]);
  const [selectTicket, setSelectTicket] = useState(0);

  const token = useToken();
  useEffect(async() => {
    await searchTikets(token)
      .then((response) => {
        setTicket(response);
      })
      .catch(() => {
        alert('malformed request');
      });
  }, []);

  useEffect(async() => {
    await searchTikets(token)
      .then((response) => {
        setTicket(response);
      })
      .catch(() => {
        alert('malformed request');
      });
  }, []);

  return ticket.length === 0 ? (
    <SubTitle>Aguarde</SubTitle>
  ) : (
    <>
      <Title>Ingresso e pagamento</Title>
      <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <Applyhorizontal>
        {ticket.map(({ id, name, price, isRemote, includesHotel }, index) => (
          <TemplateTicket
            name={name}
            price={price}
            isRemote={isRemote}
            includesHotel={includesHotel}
            key={index + 1}
            selectTicket={selectTicket}
            setSelectTicket={setSelectTicket}
            id={id}
          />
        ))}
      </Applyhorizontal>
    </>
  );
}

export const Modality = styled.div`
  font-family: 'Roboto';
font-size: 16px;
font-weight: 400;
margin-bottom: 8px;
`;

export const Price = styled.div`
color: #898989;
font-size: 14px;
`;

export const SubTitle = styled.div`
  display: flex;
  width: 450px;
  height: 40px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 5px;
  color: #8e8e8e;
`;

export const Title = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 25px;
  width: 400px;
  height: 40px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
`;

const Applyhorizontal = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  
`;

const TicketModality = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Roboto';
  align-items: center;
  width: 145px;
  height: 145px;
  margin-right: 25px;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${({ id }) => (id === number ? '#FFEED2' : '#E5E5E5')};
  border: 1px solid #cecece;
`;
