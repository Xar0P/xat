import React, { useContext, useEffect, useState } from 'react';
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
import { SocketContext } from '../../../context/socket';

const ContactBar: React.FC<{ user: User }> = ({ user: currentUser }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const userSelected = useSelector(selectUserSelected);
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState<Array<Message>>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => { dispatch(selectedUser('')); }, []);

  useEffect(() => {
    socket.emit('addUser', {
      name: currentUser.name,
      id: currentUser.id,
    });
  }, []);

  useEffect(() => {
    socket.on('getUsers', (rootUsers: any) => {
      const users = rootUsers.map((user: any) => {
        if (user.userName === currentUser.name) return false;
        return user;
      });
      setUsers(
        users,
      );
    });
  }, [socket]);

  useEffect(() => console.log(users), [socket, setUsers, users, userSelected]);

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
                key={user.socketID}
                name={user.userName}
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
