/* eslint-disable react/button-has-type */
import React, { ChangeEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { clickedInButton } from '../../../store/modules/example/reducer';
import { Container, WrapperForm } from './Register.styles';
import { TextField, Button } from '../../../components/forms';
import { validationUser } from '../../../services/utils/Validations';

const Register: React.FC = () => {
  const isClicked = useSelector((state: any) => state.testReducer.isClicked);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line consistent-return
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validationUser({ name, email, password });

    if (errors.length > 0) {
      return errors.forEach((error) => toast.error(error));
    }
  }

  return (
    <Container>
      <h1>Sign up</h1>
      <p>Sign up and enter to the best messenger app!</p>
      <WrapperForm onSubmit={handleSubmit}>
        <TextField
          name="name"
          type="text"
          placeholder="Name"
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
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<{ value: string }>) => setPassword(e.target.value)}
          required
        />

        <div>
          <a href="#1">Forgot password?</a>
        </div>

        <Button text="Register" color="#20DF7F" />
      </WrapperForm>
      <button onClick={() => dispatch(clickedInButton())}>
        {isClicked ? 'Sim' : 'Não'}
      </button>
      <Link to="/login/">Loginn</Link>
    </Container>
  );
};

export default Register;
