export function createTypesText(roomsTypes) {
  let roomsTypesText = '';
  if (roomsTypes.find((value) => value === 'Single')) roomsTypesText += 'Single';
  if (roomsTypes.find((value) => value === 'Double') && roomsTypesText === 'Single') roomsTypesText += ' e Double';
  if (roomsTypes.find((value) => value === 'Double') && roomsTypesText === '') roomsTypesText += 'Double';
  if (roomsTypes.find((value) => value === 'Triple') && roomsTypesText === 'Single e Double') roomsTypesText = 'Single, Double e Triple';
  if (roomsTypes.find((value) => value === 'Triple') && (roomsTypesText === 'Single' || roomsTypesText === 'Double')) roomsTypesText += ' e Triple';
  if (roomsTypes.find((value) => value === 'Triple') && roomsTypesText === '') roomsTypesText += 'Triple';
  
  return roomsTypesText;
}

export const roomTypes = {
  1: 'Single',
  2: 'Double',
  3: 'Triple'
};
