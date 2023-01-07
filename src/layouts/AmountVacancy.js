import styled from 'styled-components';
import { RiLoginBoxLine } from 'react-icons/ri';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export function AmountVacancy({ numberVacancy }) {
  return (
    <>
      <Center>
        {numberVacancy === 0 ? (<>
          <AiOutlineCloseCircle style={{ width: 20, color: '#CC6666' }}/>
          <NumberVacancy numberVacancy={numberVacancy}>Esgotado</NumberVacancy>
        </>) : (<>
          <RiLoginBoxLine style={{ width: 20, color: '#078632' }}/>
          <NumberVacancy>{numberVacancy} {numberVacancy === 1 ? 'vaga' : 'vagas' }</NumberVacancy>
        </>)}
        
      </Center>
    </>
  );
}

const NumberVacancy = styled.div`
  font-weight: 400;
  font-size: 9px;
  margin-top: 4px;
  color: ${({ numberVacancy }) => (numberVacancy === 0 ? '#CC6666;' : '#078632;')};
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

