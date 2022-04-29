import server from './app';

// eslint-disable-next-line no-console
const PORT = process.env.PORT || 3333;
server.listen(3333, () => console.log(`Listening on http://localhost:${PORT}`));
