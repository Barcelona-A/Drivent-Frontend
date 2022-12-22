import Booking from './Booking';
import styled from 'styled-components';
import { useState } from 'react';

export default function Room({
  id,
  isSelected,
  setKeyRoomSelected,
  room
}) {
  const [isFull, setIsFull] = useState(Boolean(room.Booking.length === room.capacity));

  function selectRoom() {
    if (isFull) return;
    if (isSelected) {
      setKeyRoomSelected(-1);
      return;
    }
    setKeyRoomSelected(id);
  }

  return (
    <RoomDiv isFull={isFull} isSelected={isSelected} onClick={selectRoom}>
      {room.name}
      <Booking roomCapacity={room.capacity} bookings={room.Booking.length} isSelected={isSelected} />
    </RoomDiv>
  );
}

const RoomDiv = styled.div`
  width: 13rem;
  margin-right: 0.3rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  border: 1px solid #CECECE;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  background-color: ${props => props.isFull ? '#CECECE' : props => props.isSelected ? '#FFEED2' : '#FFFFFF'};
  opacity: ${props => props.isFull ? 0.5 : 1};
  cursor: pointer;
  font-size: 1.2rem;

  > span {
    font-size: 1.7rem;
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
  }
`;
