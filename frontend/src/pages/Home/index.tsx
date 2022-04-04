import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

import { Container } from './Home.styles';
import { selectToken } from '../../store/modules/Auth/reducer';
import { decodeJWT } from '../../services/utils/Decode';

interface User {
  id: number,
  email: string,
  name: string,
}

const Home: React.FC = () => {
  const token = useSelector(selectToken);
  const user = decodeJWT<User>(token);

  useEffect(() => {
    const socket = io('http://localhost:3333', { autoConnect: false });

    socket.auth = { username: user.name };
    socket.connect();
  }, []);

  return (
    <Container>
      {user.name}
    </Container>
  );
};

export default Home;
