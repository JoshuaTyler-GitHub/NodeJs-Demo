// imports
const http = require('http');
const ws = require('websocket');

// constants
const port = process.env.PORT || Number("3001");

// clients
const clients = {};

// http-server
const httpServer = http.createServer();
httpServer.listen(port, () => {
  console.log(`Server running at port: "${port}".`);
});

// web-socket
const websocketServer = new ws.server({ httpServer });

// new connections
websocketServer.on('request', (request) => {
  const { remoteAddress } = request;
  console.log(`Recieved request from address: [${remoteAddress}]`);

  // accept or reject new connection
  const clientConnection = request.accept();

  // track client
  const clientId = String(remoteAddress || 'localhost');
  clients[clientId] = clientConnection;

  // send welcome message
  clientConnection.send('Welcome to the chat-bot!');
  
  // listen for client messages
  clientConnection.on('message', (message) => onMessage(clientId, message));
});

const onBroadcast = (data) => {
  console.log(`Broadcasting message to all clients: [${data}]`);
  Object.values(clients).forEach((clientConnection) => {
    clientConnection.send(data);
  });
};

const onMessage = (clientId, message) => {
  const { type } = message;
  const accessor = String(`${type}Data`);
  const data = String(message[accessor]);
  console.log(`Recieved message from clientId [${clientId}], message: [${data}]`);
  onResponse(clientId, data);
};

const onResponse = (clientId, data) => {
  const clientConnection = clients[clientId];
  // process business logic for message
  if(data.includes('broadcast')) {
    onBroadcast(data);
  }
  // determine appropriate response to client
  clientConnection.send('Thank you for your message!');
};

process.on('SIGINT', () => {
  try {
    onBroadcast('WebSocket Server is shutting down.');
    websocketServer.shutDown();
  } catch(error) {
    console.error('Experienced error closing WebSocket:', error);
  }
  process.exit();
});
