import { createServer, IncomingMessage, ServerResponse } from "http";

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  // it will run once (because request listener callback is executed when receives a incoming request) and then exit
  console.log(request);
  process.exit();
});

server.listen(3000);
