import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Container, WrapperForm } from './Login.styles';
import { TextField, CheckBox, Button } from '../../../components/forms';
import { validationUser } from '../../../services/utils/Validations';
import { useLoginUserMutation } from '../../../services/api/Auth';
import { selectToken, addToken } from '../../../store/modules/Auth/reducer';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useLoginUserMutation();

  const token = useSelector(selectToken);
  const prevPath = location?.state ? location.state.prevPath : '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validationUser({ email, password });

    if (errors.length > 0) {
      return errors.forEach((error) => toast.error(error));
    }

    try {
      const data = await loginUser({ email, password }).unwrap();
      dispatch(addToken(data.token));

      navigate(prevPath);
      return toast.success('Logado com sucesso!');
    } catch (err: any) {
      if (err?.data) {
        return err.data.errors.forEach((error: string) => toast.error(error));
      }
      return toast.error('Erro interno');
    }
  };

  useEffect(() => {
    if (token) {
      navigate(prevPath);
    }
  }, [token, navigate, prevPath]);

  return (
    <Container>
      <h1>Login</h1>
      <p>Entre no melhor app de mensagens!</p>
      <WrapperForm onSubmit={handleSubmit}>
        <TextField
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<{ value: string }>) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e: ChangeEvent<{ value: string }>) => setPassword(e.target.value)}
        />

        <div>
          <CheckBox content="Lembrar" />
          <Link to="/register/">Não tem uma conta?</Link>
        </div>

        <Button text="Login" color="#20DF7F" />
      </WrapperForm>
    </Container>
  );
};

export default Login;
