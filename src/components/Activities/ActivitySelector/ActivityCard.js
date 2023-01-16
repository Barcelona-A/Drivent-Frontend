import styled from 'styled-components';
import { intervalToDuration } from 'date-fns';
import { AmountVacancy } from '../../../layouts/AmountVacancy';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function ActivityCard({
  activityObj,
  selectedId
}) {
  const [vacancy, setVacancy] = useState(undefined);
  const [selected, setSelected] = useState(false);
  const duration= intervalToDuration({
    start: new Date(activityObj.startsAt),
    end: new Date(activityObj.endsAt),
  });
  const durationInHours = duration.hours + duration.minutes/60;
  
  useEffect(() => {
    if (selectedId === activityObj.id) setSelected(current => true);
    else setSelected(current => false);
  }, [selectedId]);

  useEffect(() => setVacancy(activityObj.capacity - activityObj._count.ActivityBooking), []);

  return (
    <Card duration={durationInHours} selected={selected}> 
      <Info>
        <h3>{activityObj.name}</h3>
        <span>{dayjs.utc(activityObj.startsAt).format('hh:mm')} - {dayjs.utc(activityObj.endsAt).format('hh:mm')}</span> 
      </Info>
      <Vacancy>
        <AmountVacancy numberVacancy={vacancy} />
      </Vacancy>
    </Card>
  );
}

const Card = styled.div`
  width: 90%;
  background-color: ${props => props.selected ? '#D0FFDB' : '#F1F1F1'};
  height: 160px;
  height: ${props => props.duration ? props.duration * 80 + 'px' : '80px' };
  margin-top: 0.5rem;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  display: flex;
  cursor: pointer;
`; 

const Info = styled.div`
  width: 75%;
  border-right: 1px solid #CFCFCF;
  margin: 0.7em;
  margin-right: 0;

  h3 {
    font-weight: bold;
    padding: 0.5rem 0;
  }

  span {
    font-size: 0.8rem;
  }
`; 

const Vacancy = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`; 
