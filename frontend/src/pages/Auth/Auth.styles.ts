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

  h1 {
    font-size: 64px;
    font-weight: 400;
  }
`;

export const WrapperForm = styled.div`
  ${CenterWithFlex}
  flex-direction: column;

  > div {
    ${CenterWithFlex}
  }
`;
