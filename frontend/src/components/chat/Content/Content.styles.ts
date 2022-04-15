import styled, { css } from 'styled-components';

export const Container = styled.section`
  width: 75%;
  height: 100%;
  background-color: rgba(58, 58, 58, 0.3);
`;

/* HEADER */
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 83px;

  padding: 20px 44px;

  border-bottom: 2px solid rgba(255, 255, 255, 0.05);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;

  background-color: #ccc;
  border-radius: 100%;

  margin-right: 10px;
`;

export const UserInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const UserName = styled.h6`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const UserStatus = styled.p`
  color: #0F80D7;
  font-size: 12px;
`;

export const Actions = styled.div`
  display: flex;
`;

export const WrapperIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 100%;

  padding: 10px;

  background-color: rgba(255, 255, 255, 0.07);

  &:not(:nth-of-type(1)) {
    margin-left: 10px;
  }
`;

const iconCSS = css`
  background-color: #fff;

  width: 20px;
  height: 20px;
  border-radius: 100%;
`;

export const SearchIcon = styled.div`${iconCSS}`;
export const PhoneIcon = styled.div`${iconCSS}`;
export const MoreIcon = styled.div`${iconCSS}`;
/* END */

/* CHAT */
export const Chat = styled.div`
  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  width: 100%;

  // Mexer nisso aqui
  height: calc(100% - 83px - 69px);

  padding: 0 44px;
`;

const messageCSS = css`
  max-width: calc(100% / 2);
  padding: 10px;
  margin-bottom: 3px;

  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const MessageSent = styled.div`
  ${messageCSS}

  align-self: flex-end;

  background-color: #1566A3;
  border-radius: 14px 14px 4px 14px;
`;

export const MessageReceived = styled.div`
  ${messageCSS}

  align-self: flex-start;

  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px 14px 14px 14px;
`;

export const MessageContent = styled.span`
  color: #fff;
  font-size: 14px;
  inline-size: 100%;
  overflow-wrap: break-word;

  margin-right: 8px;
`;

export const MessageDate = styled.span`
  align-self: flex-end;

  white-space: nowrap;
  font-size: 12px;
  color: #A1AAB3;
  font-weight: 350;
`;
/* END */

/* INPUT MESSAGE */
export const WrapperInput = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 44px;
`;

export const InputMessage = styled.input`
  width: 100%;
  padding: 13px;

  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.0512);

  margin: 5px 0 14px 0;
  color: #fff;

  &::placeholder {
    color: #8A8A8A;
  }
`;
