import { BsPerson, BsFillPersonFill } from 'react-icons/bs';
import { useState } from 'react';

function oraganizeArrForCapacity(roomCapacity, booking) {
  const arr = [];
  for (let i = 1; i <= roomCapacity; i++) {
    arr.push({ isTaken: Boolean(i <= booking), isLast: Boolean(i === roomCapacity) });
  }
  return arr;
}

export default function Booking({
  roomCapacity,
  bookings,
  isSelected,
}) {
  const [arrCapacity, setArrCapacity] = useState(oraganizeArrForCapacity(roomCapacity, bookings));
  
  return (
    <span>{arrCapacity.map((vacancy, i) => {
      let icon = vacancy.isTaken ? <BsFillPersonFill key={i} /> : <BsPerson key={i} />;
      // TODO - corrigir para o ser o primeiro icone vazio selecionado (último na UI)
      if (vacancy.isLast && isSelected) icon = <BsFillPersonFill color='#FF4791' key={i} />;
      return icon;
    })}</span>
  );
}
