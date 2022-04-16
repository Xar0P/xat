import React, {
  ChangeEvent, useContext, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { Message } from '../../../services/chat';
import { selectUserSelected } from '../../../store/modules/Chat/reducer';
import {
  Container,
  Header,
  UserInfo,
  Avatar,
  UserInfoContent,
  UserName,
  UserStatus,
  Chat,
  MessageSent,
  MessageReceived,
  InputMessage,
  Actions,
  SearchIcon,
  PhoneIcon,
  MoreIcon,
  WrapperIcon,
  MessageContent,
  MessageDate,
  WrapperInput,
} from './Content.styles';
import { SocketContext } from '../../../context/socket';

const Content: React.FC<{ user: User }> = ({ user }) => {
  const { socket, users } = useContext(SocketContext);
  const userSelected = useSelector(selectUserSelected);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<MessageResponse>>([]);
  const [username, setUsername] = useState('');
  const userSelectedObj = useMemo(
    () => users.find(
      (user) => user && user.socketID === userSelected,
    ),
    [userSelected],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = new Message({ message, senderID: user.id });

    setMessage('');
    if (userSelected) {
      socket.emit('newPrivateMessage', {
        msg,
        to: userSelected,
      });
    }
  };

  useEffect(() => {
    const username = userSelectedObj && userSelectedObj.userName;
    setUsername(username || '');

    if (userSelectedObj) {
      socket.emit('reloadMessages', {
        userID: user.id,
        friendID: userSelectedObj.userID,
      });

      socket.on('reloadMessages', (messages) => setMessages(messages));
    }
  }, [userSelected]);

  return (
    <Container>
      {userSelected
        ? (
          <>
            <Header>
              <UserInfo>
                <Avatar />
                <UserInfoContent>
                  <UserName>{username}</UserName>
                  <UserStatus>online</UserStatus>
                </UserInfoContent>
              </UserInfo>
              <Actions>
                <WrapperIcon>
                  <SearchIcon />
                </WrapperIcon>
                <WrapperIcon>
                  <PhoneIcon />
                </WrapperIcon>
                <WrapperIcon>
                  <MoreIcon />
                </WrapperIcon>
              </Actions>
            </Header>
            <Chat>
              {messages.map((message) => (
                user.id === message.sender
                  ? (
                    <MessageSent key={message.id}>
                      <MessageContent>
                        {message.message}
                      </MessageContent>
                      <MessageDate>{moment(message.date).format('LT')}</MessageDate>
                    </MessageSent>
                  )
                  : (
                    <MessageReceived key={message.id}>
                      <MessageContent>
                        {message.message}
                      </MessageContent>
                      <MessageDate>{moment(message.date).format('LT')}</MessageDate>
                    </MessageReceived>
                  )
              ))}
            </Chat>
            <WrapperInput>
              <form onSubmit={handleSubmit}>
                <InputMessage
                  type="text"
                  placeholder="Escreva uma mensagem..."
                  onChange={(e: ChangeEvent<{ value: string; }>) => setMessage(e.target.value)}
                  value={message}
                />
              </form>
            </WrapperInput>
          </>
        ) : <p>Oi</p>}
    </Container>
  );
};

export default Content;
