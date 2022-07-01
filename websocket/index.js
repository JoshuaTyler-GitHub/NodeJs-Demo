// node_modules
const http = require('http');
const ws = require('websocket');

// constants
const port = process.env.PORT || Number('3001');
const httpServer = http.createServer();
const webSocketServer = new ws.server({ httpServer });
const clients = [];

// [Client] connect
webSocketServer.on('request', (request) => {
  const clientId = String(request.remoteAddress || 'localhost');
  const clientConnection = request.accept(null, request.origin);

  // add client to array
  const client = {
    connection: clientConnection,
    id: clientId,
    isConnected: Boolean(true),
  }
  clients.push(client);

  // listen for client messages
  clientConnection.on('message', (message) => onMessage(client, message));

  // welcome the client
  console.log(`Client "${clientId}" connected.`);
  clientConnection.send(`Welcome, client: "#${clientId}".`);
});

// [Client] message
const onMessage = async (client, message) => {
  console.log(`Received message from: "${client.id}".`, message);
  onResponse(client);
};

// [Client] disconnect
webSocketServer.on('close', (clientConnection) => {
  for (const index in clients) {
    if (clients[index].connection.remoteAddress === clientConnection.remoteAddress) {
      clients[index].connection.remoteAddress = null;
      clients[index].isConnected = false;
      console.log(`Client "${clients[index].id}" disconnected.`);
      break;
    }
  }
});

// [Server] start
httpServer.listen(port, () => {
  console.log(`Server running at port: "${port}".`);
});

// [Server] response
const onResponse = async (client) => {
  client.connection.send('Thank you for your message!');
};

// [Server] shutdown
process.on('SIGINT', () => {
  try {
    webSocketServer.broadcast('WebSocket Server is shutting down.');
    webSocketServer.closeAllConnections();
    webSocketServer.shutDown();
  } catch (error) {
    console.error('Experienced error closing WebSocket:', error);
  }
  process.exit();
});
