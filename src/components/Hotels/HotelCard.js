import styled from 'styled-components';
import { createTypesText } from '../../helpers/roomTypes';

let numberId = -1;

export function HotelCard({ hotelName, hotelImage, hotelId, setSelected, roomsTypes, availableVacancies }) {
  const roomsTypesText = createTypesText(roomsTypes);
    
  function selectHotel() {
    setSelected(hotelId);
    numberId = hotelId;
  }
  
  return (
    <Card onClick={selectHotel} id = {hotelId}>
      <Container>
        <HotelImage src = {hotelImage}/>
        <HotelName>{hotelName}</HotelName>
        <Text>Tipos de acomodação:</Text>
        <SubText>{roomsTypesText}</SubText>
        <Text>Vagas disponíveis:</Text>
        <SubText>{availableVacancies}</SubText>
      </Container>
    </Card>
  );
}

export const Card = styled.div`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  background-color: ${({ id }) => (id === numberId ? '#FFEED2' : '#E5E5E5')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &&:hover {
    background-color: #FFEED2;
    filter: brightness(0.9);
    transition: 800ms;
  }
`;
export const HotelImage = styled.img`
  height: 109px;
  width: 168px;
  border-radius: 5px;
`;
export const HotelName = styled.p`
  color: #343434;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 23.44px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
`;
export const Text = styled.p`
  font-family: Arial, Helvetica, sans-serif; //Roboto
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  color: #3C3C3C;
  margin-top: 10px;
`;
export const SubText = styled(Text)`
  font-weight: 400;
  margin-top: 5px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
  font-size: 12px;
  line-height: 14px;
  color: #3C3C3C;
`;
export const Container = styled.div``;
