// node_modules
const http = require('http');
const ws = require('websocket');

// constants
const clients = {};
const port = process.env.PORT || Number('3001');

const httpServer = http.createServer();
const webSocketServer = new ws.server({ httpServer });

webSocketServer.on('request', (request) => {
  console.log('Received connection request from client.');

  // accept connection
  const connection = request.accept();
  console.log('Connection accepted.');

  // add connection to clients
  const clientId = String(request.remoteAddress || 'localhost');
  clients[clientId] = connection;

  // send welcome message
  connection.send('Welcome to the server!');

  // listen for incoming messages
  connection.on('message', (message) => {
    console.log('Received message from client.');
    console.log(`Message: ${message.utf8Data}`);
    connection.send('Thank you for your message.');
  });

  // listen for connection close
  connection.on('close', () => {
    console.log('Client closed websocket conneciton.');
  });
});

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

process.on('SIGINT', () => {
  console.log('Server is shutting down.');
  process.exit();
});
