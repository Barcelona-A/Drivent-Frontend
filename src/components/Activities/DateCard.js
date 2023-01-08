import styled from 'styled-components';
import { months, daysOfWeek } from '../../helpers/days';

let numberId = -1;

export default function DateCard({ activityDate, token, dateId, setSelected }) {
  const dayOfWeek = activityDate.split(',')[0];
  const dayOfMonth = activityDate.split(',')[1].split(' ')[1];
  const month = activityDate.split(',')[1].split(' ')[2];

  async function selectDate(date) {
    setSelected(dateId);
    numberId = dateId;
  }

  return (
    <Card id = {dateId}>
      <Date onClick = {() => selectDate(activityDate)}>{ daysOfWeek[dayOfWeek] }, { dayOfMonth }/{ months[month] }</Date>
    </Card>
  );
}

const Card = styled.div`
  width: 150px;
  height: 37px;
  border-radius: 4px;
  background-color: ${({ id }) => (id === numberId ? '#FFEED2' : '#E5E5E5')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-right: 20px;
  padding: 10px;
  cursor: pointer;
`;
const Date = styled.p`
  color: black;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
`;
