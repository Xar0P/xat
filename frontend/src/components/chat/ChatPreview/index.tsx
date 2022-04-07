import React from 'react';

import {
  Chat,
  Avatar,
  Name,
  PreviewMessage,
  DateLastMessage,
} from './ChatPreview.styles';

const ChatPreview: React.FC = () => (
  <Chat>
    <div>
      <Avatar />
      <div>
        <Name>Sweetie</Name>
        <PreviewMessage>I love you so much!</PreviewMessage>
      </div>
    </div>
    <div>
      <DateLastMessage>8:32 PM</DateLastMessage>
    </div>
  </Chat>
);

export default ChatPreview;
