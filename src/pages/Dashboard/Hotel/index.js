import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getHotelsList } from '../../../services/hotelsApi';

function CardHotel({ hotelName, hotelImage }) {
  return (
    <Card>
      <Container>
        <HotelImage src = {hotelImage}/>
        <HotelName>{hotelName}</HotelName>
        <Text>Tipos de acomodação:</Text>
        <SubText>Single e Double</SubText>
        <Text>Vagas disponíveis:</Text>
        <SubText>103</SubText>
      </Container>
    </Card>
  );
}

export default function Hotel() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);

  useEffect (async() => {
    try {
      const response = await getHotelsList(token);
      setHotels(response);
    } catch (error) {
      console.error(error);
    };
  }, []);
  console.log(hotels);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <SubTitle>Primeiro, escolha seu hotel</SubTitle>
      <CardList count = {hotels.length === 0 ? 1 : hotels.length}>
        {hotels?.map((value, index) => <CardHotel key = {index} hotelName = {value.name} hotelImage = {value.image}/>)}
      </CardList>
    </>
  );
}

const Title = styled.h1`
  font-size: 34px;
  font-weight: 400;
  line-height: 39.84px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
  color: black;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  line-height: 23.44px;
  font-family: Arial, Helvetica, sans-serif; //Roboto
  color: #8E8E8E;
  margin-top: 20px;
`;
const CardList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: calc(210px * ${props => props.count});
  height: 264px;
`;
const Card = styled.div`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  background-color: #EBEBEB;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const HotelImage = styled.img`
  height: 109px;
  width: 168px;
  border-radius: 5px;
`;
const HotelName = styled(SubTitle)`
  color: #343434;
  margin-top: 10px;
`;
const Text = styled.p`
  font-family: Arial, Helvetica, sans-serif; //Roboto
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  color: #3C3C3C;
  margin-top: 10px;
`;
const SubText = styled(Text)`
  font-weight: 400;
  margin-top: 5px;
`;
const Container = styled.div``;
