import { useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {
  useEffect(() => {
    console.log('entrei');
    const socket = io('http://localhost:3333');
    socket.on('connect', () => console.log('Conectado!'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
