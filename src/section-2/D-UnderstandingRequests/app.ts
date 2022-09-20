import { createServer, IncomingMessage, ServerResponse } from "http";

// Some important request fields
const getRequestFields = (request: IncomingMessage) => {
  const { url, method, headers } = request;
  return {
    url,
    method,
    headers
  }
}

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  console.log(getRequestFields(request));
})

server.listen(3000);
