import { createServer } from "http";

import routes from "./routes";

const server = createServer(routes);

server.listen(3000);
