import styled from 'styled-components';

export const Chat = styled.div`
  cursor: pointer;

  width: 100%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;

  > div:nth-of-type(1) {
    height: 100%;
    display: flex;
    align-items: center;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  > div:nth-of-type(2) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Avatar = styled.div`
  width: 50px;
  height: 100%;
  border-radius: 100%;

  background-color: #ccc;

  margin-right: 10px;
`;

export const Name = styled.p`
  color: #fff;
`;

export const PreviewMessage = styled.div`
  font-size: 14px;
  color: #888;
`;

export const DateLastMessage = styled.p`
  font-size: 14px;
  color: #838383;
`;
