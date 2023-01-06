import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getHotelsList, getHotelsRoomsList } from '../../../services/hotelsApi';
import { HotelCard } from '../../../components/Hotels/HotelCard';
import { getBooking } from '../../../services/bookingApi';
import { BookingCard } from '../../../components/Booking/Booking';
import { errorsMessages } from '../../../helpers/errorsMessages';
import RoomSelector from '../../../components/Hotels/RoomSelector';

export default function Hotel() {
  const token = useToken();
  const [hasBooking, setHasBooking] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [booking, setBooking] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [selected, setSelected] = useState(0);
  
  useEffect (async() => {
    try {
      const hotelsResponse = await getHotelsList(token);
      const roomsResponse = await getHotelsRoomsList(token);
      setHotels(hotelsResponse);
      setHotelRooms(roomsResponse);
    } catch (error) {
      setErrorMessage(errorsMessages[error.response.status]);
    };
  }, [isChange]);
  
  useEffect (async() => {
    try {
      const responseBooking = await getBooking(token);
      setBooking(responseBooking);
      if (responseBooking) setHasBooking(current => true);
    } catch (error) {

    }
  }, [hasBooking, isChange, callApi]);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {hasBooking && !isChange?
        <>
          <SubTitle>Você já escolheu seu quarto</SubTitle>
          <BookingCard hotelImage={booking.hotelImage} hotelName={booking.hotelName}
            roomName={booking.roomName} capacity={booking.capacity} otherBookings={booking.otherBookings} setIsChange={setIsChange}/>
        </> :
        errorMessage === '' ? <>
          <SubTitle>Primeiro, escolha seu hotel</SubTitle>
          <CardList count = {hotels.length === 0 ? 1 : hotels.length}>
            {hotels?.map((value, index) => <HotelCard key = {index} hotelId = {value.id} hotelName = {value.name} hotelImage = {value.image} 
              selected = {selected} setSelected = {setSelected} roomsTypes = {value.roomsTypes} 
              availableVacancies = {value.availableVacancies}/>)}
          </CardList>
          {
            selected !== 0 ?
              <>
                <RoomSelector hotelSelected={selected} hotelRooms={hotelRooms} setHasBooking={setHasBooking} booking={booking} isChange={isChange} setIsChange={setIsChange} 
                  setCallApi = {setCallApi}/>
              </> 
              : '' 
          }
        </> : <MessageError>{errorMessage}</MessageError>
      }
    </>
  );
}

export const Title = styled.h1`
  font-size: 34px;
  font-weight: 400;
  line-height: 39.84px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
  color: black;
`;
export const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  line-height: 23.44px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
  color: #8E8E8E;
  margin: 20px 0;
`;
const CardList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: calc(210px * ${props => props.count});
  height: 264px;
`;
export const MessageError = styled.div`
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
