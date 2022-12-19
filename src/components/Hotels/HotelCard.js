import styled from 'styled-components';
import { useState } from 'react';

export function HotelCard({ hotelName, hotelImage, selected, setSelected, roomsTypes, availableVacancies }) {
  const [color, setColor] = useState('#EBEBEB');
    
  function selectHotel() {
    if (selected === true && color === '#EBEBEB') return;
    if (color === '#EBEBEB') {
      setSelected(true);
      return setColor('#FFEED2');
    };
    setSelected(false);
    return setColor('#EBEBEB');
  }
  let roomsTypesText = '';
  if (roomsTypes.find((value) => value === 'Single')) roomsTypesText += 'Single';
  if (roomsTypes.find((value) => value === 'Double') && roomsTypesText === 'Single') roomsTypesText += ' e Double';
  if (roomsTypes.find((value) => value === 'Double') && roomsTypesText === '') roomsTypesText += 'Double';
  if (roomsTypes.find((value) => value === 'Triple') && roomsTypesText === 'Single e Double') roomsTypesText = 'Single, Double e Triple';
  if (roomsTypes.find((value) => value === 'Triple') && (roomsTypesText === 'Single' || roomsTypesText === 'Double')) roomsTypesText += ' e Triple';
  if (roomsTypes.find((value) => value === 'Triple') && roomsTypesText === '') roomsTypesText += 'Triple';
  
  return (
    <Card onClick={selectHotel} color = {color}>
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

const Card = styled.div`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  background-color: ${props => props.color};
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
const HotelImage = styled.img`
  height: 109px;
  width: 168px;
  border-radius: 5px;
`;
const HotelName = styled.p`
  color: #343434;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 23.44px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
`;
const Text = styled.p`
  font-family: Arial, Helvetica, sans-serif; //Roboto
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  color: #3C3C3C;
  margin-top: 10px;
`;
const SubText = styled(Text)`
  font-weight: 400;
  margin-top: 5px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
  font-size: 12px;
  line-height: 14px;
  color: #3C3C3C;
`;
const Container = styled.div``;
