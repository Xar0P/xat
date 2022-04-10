import React from 'react';

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

const Content: React.FC = () => (
  <Container>
    <Header>
      <UserInfo>
        <Avatar />
        <UserInfoContent>
          <UserName>Artem L.</UserName>
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
      <MessageSent>
        <MessageContent>
          lets do this quick
        </MessageContent>
        <MessageDate>10:03 AM</MessageDate>
      </MessageSent>
      <MessageReceived>
        <MessageContent>
          What do u think about creating some additional screens for our case?
        </MessageContent>
        <MessageDate>10:03 AM</MessageDate>
      </MessageReceived>
    </Chat>
    <WrapperInput>
      <InputMessage type="text" placeholder="Escreva uma mensagem..." />
    </WrapperInput>
  </Container>
);

export default Content;
