import { writeFile } from "fs";
import { createServer, IncomingMessage, ServerResponse } from "http";

/*
POST method: this will send a post request to /message,
and the cool thing about form is it will not just send such
a request, it will also look into the form, detect any inputs
or related elements like selects we might have AND IF WE GIVE that
input a name (name isn't needed to be the same name as the action route) it
will also automatically put that message into the request it sends
to our server.
*/
const formPage = `
<html>
  <head>
    <title>Enter message</title>
  </head>
  <body>
    <form action="/message" method="POST">
      <input type="text" name="message">
      <button type="submit">Send</button>
    </form>
  </body>
</html>
`;

const defaultPage = `
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
  const { url, method } = request;
  if (url === "/") {
    response.write(formPage);
    return response.end(); // we must not call any other writes or set headers below this response.end()
  }
  if (url === "/message" && method === "POST") {
    const body: Uint8Array[] = [];
    request.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    })
    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const data = parsedBody.split("=")[1];
      writeFile("file.txt", data, err => {
        response.statusCode = 302; // redirect code
        response.setHeader("Location", "/");
        return response.end();
      });
    })
  }
  response.setHeader("Content-Type", "text/html");
  response.write(defaultPage);
  response.end();
});

server.listen(3000);

