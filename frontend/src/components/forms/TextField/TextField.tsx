import React from 'react';

import { Input } from './TextField.styles';

const TextField: React.FC<
  {
    placeholder: string,
    value: string,
    onChange: any,
    type: 'text' | 'password'
  }
  > = ({
    placeholder, value, onChange, type,
  }) => (
    <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
  );

export default TextField;
