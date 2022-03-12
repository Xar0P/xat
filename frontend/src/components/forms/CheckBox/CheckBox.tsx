import React from 'react';

import { Label } from './CheckBox.styles';

const CheckBox: React.FC<{ id: string, content: string }> = ({ id, content }) => (
  <div>
    <input type="checkbox" name="" id={id} />
    <Label htmlFor={id}>
      {content}
    </Label>
  </div>
);

export default CheckBox;
