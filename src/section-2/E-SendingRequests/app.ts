import { createServer, IncomingMessage, ServerResponse } from "http";

const getRequestFields = (request: IncomingMessage) => {
  const { url, method, headers } = request;
  return {
    url,
    method,
    headers
  };
}

const chunkExample = `
<html>
  <head>
    <title>My First Page</title>
  <head>
  <body>
    <h1>Hello from my Node.js Server!</h1>
  </body>
<html>
`;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  console.log(getRequestFields(request));
  response.setHeader("Content-Type", "text/html");
  response.write(chunkExample);
  response.end();
  /*
  error, we can't write after response.end() because this tells to node that
  we are done writing the response and that it can send the response to the client
  */
  // response.write("Something");
});

server.listen(3000);

