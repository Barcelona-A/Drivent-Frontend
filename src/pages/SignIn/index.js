import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import { githubProvider } from '../../config/firebaseMethod';
import socialMediaAuth from '../../config/firebaseAuth';
import { signInGitHub } from '../../services/signInGitHub';
import styled from 'styled-components';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  
  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  async function gitHub(provider) {
    try {
      const res = await socialMediaAuth(provider);
      const userData = await signInGitHub({ email: res.email, username: res.username, accessToken: res.accessToken });
      setUserData(userData);
      navigate('/dashboard');
    } catch (error) {
      toast('Não foi possível fazer o login com o GitHub!');
    }
  }
  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
          <ButtonGit onClick = {() => gitHub(githubProvider)} fullWidth disabled={loadingSignIn} style={{ background: 'black', color: 'white' }}><img src = 'https://www.nicepng.com/png/full/52-520535_free-files-github-github-icon-png-white.png' width = '24px' style={{ marginRight: '10px' }}/>Entre com GitHub</ButtonGit>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}

const ButtonGit = styled(Button)`
  padding: 100px;
  
`;
