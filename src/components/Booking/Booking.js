import { Card, Container, HotelImage, HotelName, Text, SubText } from '../Hotels/HotelCard';
import { roomTypes } from '../../helpers/roomTypes';
import Button from '../Form/Button';

export function BookingCard({ hotelImage, hotelName, roomName, capacity, otherBookings }) {
  return (
    <>
      <Card style={{ backgroundColor: '#FFEED2' }}>
        <Container>
          <HotelImage src = {hotelImage}/>
          <HotelName>{hotelName}</HotelName>
          <Text>Quarto reservado</Text>
          <SubText>{roomName} ({capacity > 2 ? 'Triple' : roomTypes[capacity]})</SubText>
          <Text>Pessoas no seu quarto</Text>
          <SubText>{otherBookings === 0 ? 'Somente Você' : `Você e mais ${otherBookings}`}</SubText>
        </Container>
      </Card>
      <Button style = {{ top: '20px' }}>Trocar de quarto</Button>
    </>
  );
}
