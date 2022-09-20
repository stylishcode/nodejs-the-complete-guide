import { createServer, IncomingMessage, ServerResponse } from "http";

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  console.log(request);
});

server.listen(3000);
