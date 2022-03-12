import React from 'react';

import { Button } from './ButtonSubmit.styles';

const ButtonSubmit: React.FC<{ color: string, text: string }> = ({ color, text }) => (
  <Button type="submit" color={color}>{text}</Button>
);

export default ButtonSubmit;
