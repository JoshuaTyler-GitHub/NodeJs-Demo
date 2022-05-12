// Libraries
const http = require("http");
const ws = require("websocket");

// constants
const port = process.env.PORT || Number("3000");
const httpServer = http.createServer().listen(port);
const webSocketServer = new ws.server({ httpServer });
const clients = [];

// Client Handshake
webSocketServer.on("request", (request) => {
  const clientId = Number(clients.length);
  const clientConnection = request.accept(null, request.origin);
  clients.push({
    connection: clientConnection,
    id: clientId,
    isConnected: true,
  });
  clientConnection.send(`Welcome, client: "#${clientId}".`);
  console.log(`Client "${clientId}" connected.`);
});

// Client Disconnect
webSocketServer.on("close", (clientConnection) => {
  for (const index in clients) {
    if (
      clients[index].connection.remoteAddress ===
      clientConnection.remoteAddress
    ) {
        clients[index].connection.remoteAddress = null;
      clients[index].isConnected = false;
      console.log(`Client "${clients[index].id}" disconnected.`);
      break;
    }
  }
});

// NodeJS shutdown
process.on("SIGINT", () => {
  try {
    webSocketServer.broadcast("WebSocket Server is shutting down.");
    webSocketServer.closeAllConnections();
    webSocketServer.shutDown();
  } catch (error) {
    console.error("Experienced error closing WebSocket:", error);
  }
  process.exit(0);
});
