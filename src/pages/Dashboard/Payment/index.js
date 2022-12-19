import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { createTicket, searchTikets } from '../../../services/ticketsApi';
import Button from '../../../components/Form/Button';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { toast } from 'react-toastify';

let number = -1;
let typeOfHosting = '';
let ticketModality = undefined;
let priceTicket = 0;
let priceHotel = 0;

function TemplateTicket({ id, name, price, setChooseTicket, chooseTicket }) {
  function selectTicket() {
    setChooseTicket(id);
    number = id;
    ticketModality = name;

    name === 'Presencial' || name === 'Online' ? (priceTicket = price / 100) : priceTicket = 0;   
  };

  return (
    <TicketModality className="ticketModality" onClick={selectTicket} id={id}>
      <Modality className="typo">{name}</Modality>
      <Price className="price">R$ {price/100}</Price>
    </TicketModality>
  );
}

export default function TicketPayment() {
  const [ticket, setTicket] = useState([]);
  const [enrollmentId, setEnrollmentId] = useState(0);
  const [chooseTicket, setChooseTicket] = useState(0);
  const [chooseHotel, setChooseHotel] = useState('');

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

  function SelectHotel({ setChooseHotel, chooseHotel, name }) {
    setChooseHotel(name);
    typeOfHosting = name;
    if(name === 'Sem hotel') {
      priceHotel = 0;
    }
    if(name === 'Com hotel') {
      priceHotel = 350;
    }
    //console.log(chooseHotel, name);
  };

  const body = {
    enrollmentId,
    ticketTypeId: number,
    status: 'RESERVAD',
  };

  async function ReservedTicket() {
    try {
      const enrollmented = await getPersonalInformations(token);
      if(!enrollmented) return;
      setEnrollmentId(enrollmented.id);

      const createdTicket = await createTicket(body, token);
      if(createdTicket) {
        return toast('ticket Reservado!');
      };
    } catch (error) {
      if (error.response.data) {
        return toast('Voçê já possui ticket Reservado!');
      }
      alert('malformed request');
    }
  }

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
            setChooseTicket={setChooseTicket}
            chooseTicket={chooseTicket}
            id={id}
          />
        ))}
      </Applyhorizontal>
      {ticketModality === undefined ? (
        ''
      ) : ticketModality === 'Online' ? (
        <>
          <SubTitle >Fechado! O total ficou em <strong style={{ paddingLeft: 3 }}> R$ {priceHotel + priceTicket}</strong>. Agora é só confirmar:</SubTitle>
          <Button onClick={ReservedTicket}>RESERVAR INGRESSO</Button>
        </>
        
      ) : (
        <>
          <SubTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitle>
          <Applyhorizontal>
            <TicketModality
              className="ticketModality"
              onClick={() => SelectHotel({ setChooseHotel, chooseHotel, name: 'Sem hotel' })}
              accommodation="Sem hotel"
            >
              <Modality className="typo">Sem Hotel</Modality>
              <Price className="price">R$ 0</Price>
            </TicketModality>{' '}
            <TicketModality
              className="ticketModality"
              onClick={() => SelectHotel({ setChooseHotel, chooseHotel, name: 'Com hotel' })}
              accommodation="Com hotel"
            >
              <Modality className="typo">Com Hotel</Modality>
              <Price className="price">R$ 350</Price>
            </TicketModality>
          </Applyhorizontal>

          {typeOfHosting === '' ? '' : (<>
            <SubTitle >Fechado! O total ficou em <strong style={{ paddingLeft: 3 }}> R$ {priceHotel + priceTicket}</strong>. Agora é só confirmar:</SubTitle>
            <Button onClick={ReservedTicket}>RESERVAR INGRESSO</Button>
          </>)
          }
        </>
      )}
    </>
  );
}
//TODO pra ciar um ticket: ja tem que ter inscrição, e não pode ter ticket ja cadastrado.

export const Negrito = styled.span`

`;

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
  width: 550px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  margin-top: 25px;
  margin-bottom: 12px;
  font-size: 20px;
  color: #8e8e8e;
`;

export const Title = styled.div`
  display: flex;
  justify-content: left;
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
  margin-right: 25PX;
  margin-bottom: 8px;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${({ id, accommodation }) => (id === number || typeOfHosting ===  accommodation ? '#FFEED2' : '#E5E5E5')};
  border: 1px solid #cecece;
`;
