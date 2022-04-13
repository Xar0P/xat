import React from 'react';

import {
  Chat,
  Avatar,
  Name,
  PreviewMessage,
  DateLastMessage,
} from './ChatPreview.styles';

const ChatPreview: React.FC<{
  isSelected: boolean,
  name: string,
  previewMessage?: string,
  dateLastMessage?: string,
  handleClick: any
}> = ({
  isSelected, name, previewMessage, dateLastMessage, handleClick,
}) => (
  <Chat onClick={handleClick} isSelected={isSelected}>
    <div>
      <Avatar />
      <div>
        <Name>{name}</Name>
        <PreviewMessage>{previewMessage || 'online'}</PreviewMessage>
      </div>
    </div>
    <div>
      <DateLastMessage>{dateLastMessage}</DateLastMessage>
    </div>
  </Chat>
);

export default ChatPreview;
