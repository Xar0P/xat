import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    border: 0;
  }

  html, body, #root {
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    height: 100%;
  }
`;
