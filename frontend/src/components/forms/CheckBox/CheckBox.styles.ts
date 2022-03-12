import styled from 'styled-components';

export const CheckMark = styled.div`
  position: relative;
  top: 0;
  left: 0;

  height: 18px;
  width: 18px;
  background-color: #224957;
  border-radius: 5px;

  &::after {
    content: '';
    display: none;
    position: absolute;

    left: 20%;
    top: 50%;
    width: 30%;
    height: 50%;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg) translateX(-50%) translateY(-50%);
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;

  > input {
    display: none;
  }

  &:hover input + ${CheckMark} {
    background-color: #ccc;
  }

  > input:checked + ${CheckMark} {
    background-color: #2196F3;

    &::after {
      display: block;
    }
  }

  > span {
    font-size: 1em;
    margin-left: 7px;
  }
`;
