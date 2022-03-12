import React, { ChangeEvent, useState, useEffect } from 'react';

import { Container, WrapperForm } from './Auth.styles';
import { TextField, CheckBox, Button } from '../../components/forms';

const Auth: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   console.log(name);
  //   console.log(password);
  // }, [name, password]);

  return (
    <Container>
      <h1>Sign in</h1>
      <p>Sign in and enter to the best messenger app!</p>
      <WrapperForm>
        <TextField
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e: ChangeEvent<{ value: string }>) => setName(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e: ChangeEvent<{ value: string }>) => setPassword(e.target.value)}
        />

        <div>
          <CheckBox content="Remember me" />
          <a href="#1">Forgot password?</a>
        </div>

        <Button text="Login" color="#20DF7F" />
      </WrapperForm>
    </Container>
  );
};

export default Auth;
