import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserSelected, selectedUser } from '../../../store/modules/Chat/reducer';
import { ChatPreview } from '..';
import {
  Container,
  Top,
  Title,
  MenuButton,
  Search,
  ChatWrapper,
} from './ContactBar.styles';

const ContactBar: React.FC<{
  socket: Socket | undefined,
  user: User
}> = ({ socket, user: currentUser }) => {
  const dispatch = useDispatch();
  const userSelected = useSelector(selectUserSelected);
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState<Array<Message>>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => { dispatch(selectedUser('')); }, []);

  useEffect(() => {
    if (socket) {
      socket.on('users', (rootUsers: any) => {
        const users = rootUsers.map((user: any) => {
          if (user.username === currentUser.name) return false;
          return user;
        });
        setUsers((prevUsers: any) => [...prevUsers, ...users]);
      });

      socket.on('user connected', (user: any) => {
        setUsers((prevUsers: any) => [...prevUsers, user]);
      });
    }
  }, [socket]);

  const handleClick = (e: any, id: string) => {
    dispatch(selectedUser(id));
  };

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
              <ChatPreview
                key={user.userID}
                name={user.username}
                handleClick={(e: any) => handleClick(e, user.userID)}
                isSelected={user.userID === userSelected}
              />
            );
          }
          return false;
        })}
      </ChatWrapper>
    </Container>
  );
};

export default ContactBar;
