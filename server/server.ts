import { createServer } from "http";
import { app } from "./app";
import { Server } from "socket.io";
const PORT = process.env.PORT;
require('dotenv').config()
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
