import styled, { css } from 'styled-components';

const CenterWithFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  ${CenterWithFlex}
  flex-direction: column;

  height: 100%;
  background-color: #093545;

  font-family: 'Lexend Deca', sans-serif;
  color: #fff;

  > h1 {
    font-size: 64px;
    font-weight: 400;

    margin-bottom: min(40px, 2.608%);
  }

  > p {
    margin-bottom: min(36px, 2.347%);
  }
`;

export const WrapperForm = styled.div`
  ${CenterWithFlex}
  flex-direction: column;

  > input:first-of-type {
    margin-bottom: min(32px, 10.67%);
  }

  > input:nth-of-type(2) {
    margin-bottom: min(23px, 7.67%);
  }

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: min(24px ,8%);
    font-size: 14px;

    > a {
      text-decoration: none;
      color: #20DF7F;
    }
  }
`;
