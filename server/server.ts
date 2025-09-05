import { createServer } from "http";
import { app } from "./app";
import { Server } from "socket.io";
const PORT = process.env.PORT;
require("dotenv").config();
const server = createServer(app);
const io = new Server(server);

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

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
