import React from 'react';

import { Label, CheckMark } from './CheckBox.styles';

const CheckBox: React.FC<{ content: string }> = ({ content }) => (
  <Label>
    <input type="checkbox" name="" />
    <CheckMark />
    <span>{content}</span>
  </Label>
);

export default CheckBox;
