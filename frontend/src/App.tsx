import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import GlobalStyles from './assets/styles/GlobalStyles';
import { Auth } from './pages/index';

function App() {
  // useEffect(() => {
  //   console.log('entrei');
  //   const socket = io('http://localhost:3333');
  //   socket.on('connect', () => console.log('Conectado!'));
  // }, []);

  return (
    <>
      <Auth />
      <GlobalStyles />
    </>
  );
}

export default App;
