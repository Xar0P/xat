import React, { useContext, useEffect } from 'react';
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

const ContactBar: React.FC = () => {
  const { users } = useContext(SocketContext);
  const dispatch = useDispatch();
  const userSelected = useSelector(selectUserSelected);
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => { dispatch(selectedUser('')); }, []);

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
        {users.map((user: any) => {
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
