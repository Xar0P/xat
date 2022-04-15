import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container } from './Home.styles';
import { selectToken } from '../../store/modules/Auth/reducer';
import { decodeJWT } from '../../services/utils/Decode';
import { ContactBar, Content } from '../../components/chat';
import { SocketContext, socket } from '../../context/socket';

const Home: React.FC = () => {
  const token = useSelector(selectToken);
  const currentUser = decodeJWT<User>(token);
  const [users, setUsers] = useState<Array<UserResponse | false>>([]);

  useEffect(() => {
    socket.emit('addUser', {
      name: currentUser.name,
      id: currentUser.id,
    });
  }, []);

  useEffect(() => {
    socket.on('getUsers', (rootUsers: UserResponse[]) => {
      const users = rootUsers.filter((user) => {
        if (user.userName === currentUser.name) return false;
        return user;
      });
      setUsers(
        users,
      );
    });
  }, [socket]);

  const chatContext = useMemo(() => ({
    socket, users,
  }), [users, socket]);

  return (
    <SocketContext.Provider value={chatContext}>
      <Container>
        <ContactBar />
        <Content user={currentUser} />
      </Container>
    </SocketContext.Provider>
  );
};

export default Home;
