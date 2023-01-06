import { useEffect, useState } from 'react';
import { errorsMessagesActivities } from '../../../helpers/errorsMessages';
import { getActivitiesList } from '../../../services/activitiesApi';
import useToken from '../../../hooks/useToken';
import { MessageError, Title } from '../Hotel';
import { AmountVacancy } from '../../../layouts/AmountVacancy';

export default function Activities() {
  const [errorMessage, setErrorMessage] = useState('');
  const [activities, setActivities] = useState([]);
  const token = useToken();

  useEffect( async() => {
    try {
      const response = await getActivitiesList(token);
      setActivities(response);
    } catch (error) {
      setErrorMessage(errorsMessagesActivities[error.response.status]);
    }
  }, []);

  return (
    <>
      {errorMessage === '' ? '' : (<> 
        <Title>Escolha de atividades</Title>
        <MessageError>{errorMessage}</MessageError>
      </>)}
    </>
  );
}
