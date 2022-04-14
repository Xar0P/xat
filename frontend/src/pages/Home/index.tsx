import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container } from './Home.styles';
import { selectToken } from '../../store/modules/Auth/reducer';
import { decodeJWT } from '../../services/utils/Decode';
import { ContactBar, Content } from '../../components/chat';
import { SocketContext, socket } from '../../context/socket';

const Home: React.FC = () => {
  const token = useSelector(selectToken);
  const user = decodeJWT<User>(token);

  return (
    <SocketContext.Provider value={socket}>
      <Container>
        <ContactBar user={user} />
        <Content user={user} />
      </Container>
    </SocketContext.Provider>
  );
};

export default Home;
