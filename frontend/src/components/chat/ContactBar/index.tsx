import React, { useEffect, useState } from 'react';

import { Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../store/modules/Auth/reducer';

import { ChatPreview } from '..';
import {
  Container,
  Top,
  Title,
  MenuButton,
  Search,
  ChatWrapper,
} from './ContactBar.styles';
import { decodeJWT } from '../../../services/utils/Decode';

const ContactBar: React.FC<{ socket: Socket | undefined }> = ({ socket }) => {
  const token = useSelector(selectToken);
  const currentUser = decodeJWT<any>(token);
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState<Array<Message>>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('users', (rootUsers: any) => {
        const users = rootUsers.map((user: any) => {
          if (user.username === currentUser.name) return false;
          return user;
        });
        console.log(users);
        setUsers((prevUsers: any) => [...prevUsers, ...users]);
      });

      socket.on('user connected', (user: any) => {
        setUsers((prevUsers: any) => [...prevUsers, user]);
      });
    }
  }, [socket]);

  return (
    <Container>
      <Top>
        <Title>
          <MenuButton />
          <h1>Chats</h1>
        </Title>
        <Search type="search" placeholder="Pesquisar" />
      </Top>
      <ChatWrapper>
        {users.map((user) => {
          if (user) {
            return (
              <ChatPreview key={user.userID} name={user.username} />
            );
          }
          return false;
        })}
      </ChatWrapper>
    </Container>
  );
};

export default ContactBar;
