/* eslint-disable react/button-has-type */
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Container, WrapperForm } from './Register.styles';
import { TextField, Button } from '../../../components/forms';
import { validationUser } from '../../../services/utils/Validations';
import { useRegisterUserMutation } from '../../../services/api/Auth';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validationUser({ name, email, password });

    if (errors.length > 0) {
      return errors.forEach((error) => toast.error(error));
    }

    try {
      await registerUser({ name, email, password }).unwrap();
      navigate('/login/');
      return toast.success('Conta criada com sucesso!');
    } catch (err: any) {
      return err.data.errors.forEach((error: string) => toast.error(error));
    }
  };

  return (
    <Container>
      <h1>Registro</h1>
      <p>Registre-se e entre no melhor aplicativo de mensagens!</p>
      <WrapperForm onSubmit={handleSubmit}>
        <TextField
          name="name"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e: ChangeEvent<{ value: string }>) => setName(e.target.value)}
          required
        />
        <TextField
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<{ value: string }>) => setEmail(e.target.value)}
          required
        />
        <TextField
          name="password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e: ChangeEvent<{ value: string }>) => setPassword(e.target.value)}
          required
        />

        <div>
          <a href="#1">Esqueceu sua senha?</a>
        </div>

        <Button text="Registrar" color="#20DF7F" />
      </WrapperForm>
    </Container>
  );
};

export default Register;
