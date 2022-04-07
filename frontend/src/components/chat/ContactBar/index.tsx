import React from 'react';

import { ChatPreview } from '..';
import {
  Container,
  Top,
  Title,
  MenuButton,
  Search,
  ChatWrapper,
} from './ContactBar.styles';

const ContactBar: React.FC = () => (
  <Container>
    <Top>
      <Title>
        <MenuButton />
        <h1>Chats</h1>
      </Title>
      <Search type="search" placeholder="Pesquisar" />
    </Top>
    <ChatWrapper>
      <ChatPreview />
    </ChatWrapper>
  </Container>
);

export default ContactBar;
