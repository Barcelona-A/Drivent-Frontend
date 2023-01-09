import { useEffect, useState } from 'react';
import { errorsMessagesActivities } from '../../../helpers/errorsMessages';
import { getActivitiesList } from '../../../services/activitiesApi';
import useToken from '../../../hooks/useToken';
import { MessageError, Title } from '../Hotel';
import styled from 'styled-components';
import { SubTitle } from '../Hotel';
import DateCard from '../../../components/Activities/DateCard';
import { ActivitySelector } from '../../../components/Activities/ActivitySelector';

export default function Activities() {
  const [errorMessage, setErrorMessage] = useState('');
  const [activitiesDates, setActivitiesDates] = useState([]);
  const token = useToken();
  const [selected, setSelected] = useState(0);

  useEffect( async() => {
    try {
      const response = await getActivitiesList(token);
      setActivitiesDates(response);
    } catch (error) {
      setErrorMessage(errorsMessagesActivities[error.response.status]);
    }
  }, []);

  return (
    <>
      <Title>Escolha de atividades</Title>
      {errorMessage === '' ?
        <>
          <SubTitle>Primeiro, filtre pelo dia do evento:</SubTitle>
          <ActivitiesDates>
            { activitiesDates?.map((value, index) => <DateCard key = { index } activityDate = { value } token = { token } dateId = { index + 1 } setSelected = { setSelected }/>)}
          </ActivitiesDates>
          {selected !== 0? <ActivitySelector activitiesDate={activitiesDates[selected - 1]} selectedIndex={selected} /> : ''}
        </>
        :
        <MessageError>{errorMessage}</MessageError>
      }
    </>
  );
}

const ActivitiesDates = styled.div`
  display: flex;
  margin-top: 20px;
`;
