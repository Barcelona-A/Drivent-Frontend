import styled from 'styled-components';
import { PlaceContainer } from './PlaceContainer';
import { useEffect, useState } from 'react';
import { getActivitiesList } from '../../../services/activitiesApi';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';

function reducer(state, local) {
  if (local.Activity.length >= 1) state.push({ ...local });
  return state;
}

export function ActivitySelector({
  activitiesDate,
  selectedIndex,
}) {
  const [activities, setActivities] = useState([]);
  const [placesCount, setPlacesCount] = useState(0);
  const [widthContainer, setWidthContainer] = useState('');
  const token = useToken();

  useEffect (async() => {
    try {
      const activitiesResponse = await getActivitiesList(token, activitiesDate);
      const activities = activitiesResponse.reduce(reducer, []);

      const placesCountResponse = activities.length;
      setPlacesCount(placesCountResponse);
      const widthContainerResponse = placesCountResponse !== 1 ? `${1/placesCountResponse * 100}%` : '50%';
      setWidthContainer(widthContainerResponse);
      setActivities(activities);
    } catch (error) {
      toast('Não foi possível acessar essa data');
    }    
  }, [selectedIndex]);

  return (
    <Selector containerCount={placesCount}>
      {activities.map(place => <PlaceContainer key={place.id} width={widthContainer} name={place.name} activities={place.Activity}  />)}
    </Selector>
  );
}

const Selector = styled.div`
  display:flex;
  flex-direction: ${props => props.containerCount > 1 ? 'row' : 'column' };
  align-items: center;
`;
