import styled, { css } from 'styled-components';

const cssSelected = css`
  background-color: rgba(255, 255, 255, 0.0605);;
  border-radius: 4px;

  > div:nth-of-type(1)::before {
    content: '';

    position: absolute;
    left: -10px;

    width: 3px;
    height: 50%;
    background-color: #60CDFF;

    margin-right: 6px;
    border-radius: 5px;
  }
`;

export const Chat = styled.div<{ isSelected: boolean | undefined }>`
  ${(props) => (props.isSelected
    ? cssSelected
    : '')
}
  cursor: pointer;

  width: 100%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;

  > div:nth-of-type(1) {
    position: relative;

    justify-self: flex-start;

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
