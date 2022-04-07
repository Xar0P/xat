import React, { useEffect, ChangeEvent, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';

import { Container } from './Home.styles';
import { selectToken } from '../../store/modules/Auth/reducer';
import { decodeJWT } from '../../services/utils/Decode';
import { TextField, Button } from '../../components/forms';
import { Message } from '../../services/chat';
import { ContactBar } from '../../components/chat';

interface User {
  id: number,
  email: string,
  name: string,
}

const Home: React.FC = () => {
  const token = useSelector(selectToken);
  const user = decodeJWT<User>(token);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io('http://localhost:3333', { autoConnect: false });
    socket.auth = { username: user.name };
    socket.connect();
    setSocket(socket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('chat message', (newMessage: Message) => {
        setMessages((messages) => [...messages, newMessage]);
      });
    }
  }, [socket, setMessages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = new Message({ message, sender: user.name });
    socket?.emit('chat message', msg);

    setMessage('');
  };

  return (
    <Container>
      <ContactBar />
      {/* {user.name}
      <form onSubmit={handleSubmit}>
        <TextField
          name="message"
          placeholder="Mensagem"
          type="text"
          value={message}
          onChange={(e: ChangeEvent<{ value: string }>) => setMessage(e.target.value)}
        />
        <Button color="#000" text="Enviar" />
      </form>
      {messages.map((message) => {
        const dateMessage = new Date(message.date);
        const day = dateMessage.getDay();
        const month = dateMessage.getMonth();
        const hours = dateMessage.getHours();
        const minutes = dateMessage.getMinutes();
        const seconds = dateMessage.getSeconds();

        return (
          <p key={message.id}>
            {message.message}
            {' '}
            ||
            {' '}
            {message.sender}
            --
            {' '}
            {day}
            /
            {month}
            {' '}
            às
            {' '}
            {hours}
            :
            {minutes}
            {seconds}
          </p>
        );
      })} */}
    </Container>
  );
};

export default Home;
