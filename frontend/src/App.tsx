/* eslint-disable no-redeclare */
/* eslint-disable no-import-assign */
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes';
import GlobalStyles from './assets/styles/GlobalStyles';
import { store, persistor } from './store/modules/store';

function App() {
  // useEffect(() => {
  //   console.log('entrei');
  //   const socket = io('http://localhost:3333');
  //   socket.on('connect', () => console.log('Conectado!'));
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes />
          <GlobalStyles />
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
