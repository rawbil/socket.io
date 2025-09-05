import { createServer } from "http";
import { app } from "./app";
import { Server } from "socket.io";
const PORT = process.env.PORT;
require("dotenv").config();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id); // When each user connects, they get a unique id

  //Listen for custom events
  socket.on("message", (message) => {
    console.log("Message from client: ", message);

    //Broadcast to everyone(including sender)
    io.emit("chat message", message);
  });

  //Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// Now connect to client using the cdn: pnpm install socket.io-client

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
