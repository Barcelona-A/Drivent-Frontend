import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { sendTicket } from '../../../services/ticketsApi';
export default function Payment() {
  const token = useToken();
  async function ticketService() {
    const ticketData = {
      ticketTypeId: 0, //passar o id do tipo do ticket escolhido
    };

    try {
      await sendTicket(ticketData, token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <p>Fechado! O total ficou em <strong>R$ 600</strong>. Agora é só confirmar</p>
      <Button onClick = {ticketService}>RESERVAR INGRESSO</Button>
    </>
  );
}

const Button = styled.button`
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 162px;
  height: 37px;
  font-size: 12px;
  color: black;
  line-height: 16.41px;
  text-align: center;
  border: none;
  cursor: pointer;

  &&:hover {
    filter: brightness(0.8);
    transition: 800ms;
  }
`;
