import { IncomingMessage, ServerResponse } from "http";

const HomePage = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Dummy Home</title>
    <head>
    <body>
      <h1>Create a new dummy user here</h1>
      <form method="POST" action="/create-user">
        <input type="text" name="username">
        <button type="submit">Send</button>
      </form>
    </body>
  <html>
`;

const UsersPage = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Users</title>
    <head>
    <body>
      <ul>
        <li>User 1</li>
        <li>User 2</li>
        <li>User 2</li>
        <li>User 2</li>
        <li>User 5</li>
      </ul>
    </body>
  <html>
`;


const requestHandler = (request: IncomingMessage, response: ServerResponse) => {
  const { url } = request;

  if (url === "/") {
    response.write(HomePage);
    return response.end();
  }

  if (url === "/create-user") {
    const body: Uint8Array[] = [];

    request.on("data", chunk => {
      body.push(chunk);
    });
    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const data = parsedBody.split("=")[1];
      console.log(data);
    });
  }

  if (url === "/users") {
    response.write(UsersPage)
    return response.end();
  }

}

export default requestHandler;
