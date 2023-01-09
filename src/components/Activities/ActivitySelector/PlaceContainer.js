import { ActivityCard } from './ActivityCard';
import styled from 'styled-components';
import Title from '../../Title';

export function PlaceContainer({
  width,
  name,
  activities,
}) {
  return (
    <Container width={width}> 
      <PlaceTitle>{name}</PlaceTitle>
      <Border>
        {activities.map(activity => <ActivityCard key={activity.id} activityObj={activity} id={activity.id} selectedId={0}/>)}
      </Border>
    </Container>
  );
}

const Border = styled.div`
  width: 100%; 
  height: 25rem;
  border: 1px solid #D7D7D7; // TODO - deixar a espessura da border dinâmica conforme o num de lugares
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlaceTitle = styled(Title)`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Container = styled.div`
  width: ${props => props.width || '100%'};
`;

