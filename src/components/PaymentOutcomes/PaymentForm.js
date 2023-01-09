import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import Button from '../Form/Button';
import * as paymentApi from '../../services/paymentApi';
import { SubTitle } from '../../layouts/Subtitle';
import { toast } from 'react-toastify';

export default function PaymentForm({ ticketId, value, refreshTicket, setRefreshTicket }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [issuer, setIssuer] = useState('');
  const token = useToken();

  function clearNumber(value = '') {
    return value.replace(/\D+/g, '');
  }

  function formatExpirationDate(value) {
    const clearValue = clearNumber(value);
  
    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }
  
    return clearValue;
  }

  function handleExpiry(e) {
    e.target.value = formatExpirationDate(e.target.value);
    setExpiry(e.target.value);
  }

  function handleCallback({ issuer }, isValid) {
    if (isValid) {
      setIssuer(issuer);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if(!issuer || !number || !name || !expiry || !cvc) {
      return toast('Pagamento não concluído, por favor confira seus dados');
    }

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
    try {
      await paymentApi.postPayment(body, token);
      setRefreshTicket(!refreshTicket);
      return toast('Pagamento completado com sucesso');
    } catch (error) {
      return toast('Ops, confira se os dados estão corretos');
    }
  };
  
  return (
    <>
      <SubTitle>Pagamento</SubTitle>
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
              maxLength={16}
              value={number}
              placeholder={'Card Number(only numbers)'}
              onChange={e => setNumber(e.target.value)}
              onFocus={e => setFocus(e.target.name)}
              required
            />
            
            <CardInput
              type="tel"
              name="name"
              value={name}
              placeholder={'Name'}
              onChange={e => setName(e.target.value)}
              onFocus={e => setFocus(e.target.name)}
              required
            />
            <div>
              <CardInput
                type="tel"
                name="Valid thru"
                value={expiry}
                placeholder={'Valid thru'}
                pattern={'dd/dd'}
                onChange={handleExpiry}
                onFocus={e => setFocus(e.target.name)}
                required
              />

              <CardInput
                type="tel"
                name="cvc"
                value={cvc}
                maxLength={3}
                placeholder={'CVV'}
                onChange={e => setCvc(e.target.value)}
                onFocus={e => setFocus(e.target.name)}
                required
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
    margin: 20px 0px;
    width: 100%;
    display: flex;
`;

const InputsContainer = styled.div`
    width: 80%;
    height: 215px;
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
