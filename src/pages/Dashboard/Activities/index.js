import { useEffect, useState } from 'react';
import { errorsMessages } from '../../../helpers/errorsMessages';
import { getActivitiesList } from '../../../services/activitiesApi';
import useToken from '../../../hooks/useToken';
import { MessageError } from '../Hotel';

export default function Activities() {
  const [errorMessage, setErrorMessage] = useState('');
  const [activities, setActivities] = useState([]);
  const token = useToken();

  useEffect( async() => {
    try {
      const response = await getActivitiesList(token);
      console.log(response);
      setActivities(response);
    } catch (error) {
      console.error(error);
      setErrorMessage(errorsMessages[error.response.status]);
    }
  }, []);

  return (
    <>
      {errorMessage === '' ? 'Atividades em breve!' : <MessageError>{errorMessage}</MessageError>}
    </>
  );
}
