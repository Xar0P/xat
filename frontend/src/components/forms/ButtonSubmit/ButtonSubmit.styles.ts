import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) => props.color};

  padding: 0 12px;
  text-align: center;

  width: 300px;
  height: 54px;
  border-radius: 10px;

  cursor: pointer;

  color: #fff;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;
