import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import Button from '../Form/Button';
import * as paymentApi from '../../services/paymentApi';
import { SubTitle } from '../../layouts/Subtitle';

export default function PaymentForm({ ticketId, value }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [issuer, setIssuer] = useState('');
  const token = useToken();

  function handleCallback({ issuer }, isValid) {
    if (isValid) {
      setIssuer(issuer);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    const cardData = {
      name,
      number,
      expirationDate: expiry,
      cvv: cvc,
      issuer,
    };

    const body = {
      ticketId,
      value,
      cardData,
    };

    paymentApi.postPayment(body, token);
  };
  
  return (
    <>
      <SubTitle>Pagemento</SubTitle>
      <CardFormContainer>
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
          callback={handleCallback}
        />
        <form>
          <InputsContainer>
            <CardInput
              type="tel"
              name="number"
              value={number}
              placeholder={'Card Number'}
              onChange={e => setNumber(e.target.value)}
              onFocus={e => setFocus(e.target.name)}
            />
            
            <CardInput
              type="tel"
              name="name"
              value={name}
              placeholder={'Name'}
              onChange={e => setName(e.target.value)}
              onFocus={e => setFocus(e.target.name)}
            />
            <div>
              <CardInput
                type="tel"
                name="Valid thru"
                value={expiry}
                placeholder={'Valid thru'}
                onChange={e => setExpiry(e.target.value)}
                onFocus={e => setFocus(e.target.name)}
              />

              <CardInput
                type="tel"
                name="cvc"
                value={cvc}
                placeholder={'CVV'}
                onChange={e => setCvc(e.target.value)}
                onFocus={e => setFocus(e.target.name)}
              />
            </div>
          </InputsContainer>
        </form>
      </CardFormContainer>
      <Button onClick={handleSubmit}>
                Finalizar Pagamento
      </Button>
    </>
  );
};

const CardFormContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
`;

const InputsContainer = styled.div`
    height: 225px;
    padding: 10px 25px;
    margin-top: -25px;

    & div {
      height: 100%;
      display: flex;
      gap: 20px;
    }
`;

const CardInput = styled.input`
      width: ${props => props.name === 'cvc' ? '40%' : '100%' };
      height: 28%;
      margin-top: 10px;
      border: 1px solid #CECECE;
      border-radius: 5px;
      padding-left: 10px;
      padding-top: 8px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-size: 20px;
      font-weight: 400;
      line-height: 23px;

      ::placeholder {
      color: #898989;
    }
`;
