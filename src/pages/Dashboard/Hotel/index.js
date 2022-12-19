import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getHotelsList } from '../../../services/hotelsApi';
import { HotelCard } from '../../../components/Hotels/HotelCard';

export default function Hotel() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  const [messageError, setMessageError] = useState('');
  const [selected, setSelected] = useState(false);
  const messages = {
    400: 'Ops! Algo deu errado, estamos trabalhando nisso!',
    402: 'Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades',
    403: 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem',
    404: 'Faça primeiro um cadastro!'
  };

  useEffect (async() => {
    try {
      const response = await getHotelsList(token);
      setHotels(response);
    } catch (error) {
      setMessageError(messages[error.response.status]);
    };
  }, []);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {messageError === '' ? <>
        <SubTitle>Primeiro, escolha seu hotel</SubTitle>
        <CardList count = {hotels.length === 0 ? 1 : hotels.length}>
          {hotels?.map((value, index) => <HotelCard key = {index} hotelName = {value.name} hotelImage = {value.image} 
            selected = {selected} setSelected = {setSelected} roomsTypes = {value.roomsTypes} availableVacancies = {value.availableVacancies}/>)}
        </CardList>
      </> : <MessageError>{messageError}</MessageError>}
    </>
  );
}

const Title = styled.h1`
  font-size: 34px;
  font-weight: 400;
  line-height: 39.84px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
  color: black;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  line-height: 23.44px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
  color: #8E8E8E;
  margin-top: 20px;
`;
const CardList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: calc(210px * ${props => props.count});
  height: 264px;
`;
const MessageError = styled.div`
  font-family: Arial, Helvetica, sans-serif; //Roboto
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
  margin: 250px auto;
  width: 464px;
  text-align: center;
`;
