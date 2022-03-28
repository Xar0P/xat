import React from 'react';

import { Input } from './TextField.styles';

const TextField: React.FC<
  {
    placeholder: string,
    value: string,
    onChange: any,
    type: 'text' | 'password' | 'email',
    name: string,
    required?: boolean
  }
  > = ({
    placeholder, value, onChange, type, name, required,
  }) => (
    <Input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );

export default TextField;
