import React, { ChangeEvent, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Container, WrapperForm } from './Login.styles';
import { TextField, CheckBox, Button } from '../../../components/forms';

const Login: React.FC = () => {
  const isClicked = useSelector((state: any) => state.testReducer.isClicked);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(isClicked);
  }, [isClicked]);

  return (
    <Container>
      <h1>Sign in</h1>
      <p>Sign in and enter to the best messenger app!</p>
      <WrapperForm>
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
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<{ value: string }>) => setPassword(e.target.value)}
        />

        <div>
          <CheckBox content="Remember me" />
          <a href="#1">Forgot password?</a>
        </div>

        <Button text="Login" color="#20DF7F" />
      </WrapperForm>
      {isClicked ? 'Sim' : 'Não'}
    </Container>
  );
};

export default Login;
