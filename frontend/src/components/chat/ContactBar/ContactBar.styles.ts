import styled from 'styled-components';

import MenuButtonSVG from '../../../assets/svgs/Shape.svg';

export const Container = styled.aside`
  width: 25%;
  height: 100%;


  display: flex;
  flex-direction: column;
  justify-content: flex-start;


`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 16px;
  padding: 0 16px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;

  > h1 {
    color: #fff;
    font-size: 14px;
    line-height: 20px;
  }

  margin: 16px 0;
`;

export const MenuButton = styled.div`
  min-width: 16px;
  min-height: 10px;
  width: 16px;
  height: 10px;
  font-size: 18px;
  margin-right: 16px;

  background-image: url(${MenuButtonSVG});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Search = styled.input`
  width: 100%;
  height: 32px;
  padding-left: 12px;

  border-bottom: 1px solid #fff;
  border-radius: 3px;

  background-color: rgba(255, 255, 255, 0.0605);
`;

export const ChatWrapper = styled.div`
  overflow-y: scroll;
  padding: 0 6px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
