import { createServer } from "http";
import { app } from "./app";
import { Server } from "socket.io";
const PORT = process.env.PORT || 4000;
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN as string, "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});

// initiate a connection
io.on("connection", (socket) => {
  console.log("a user connected", socket.id); // When each user connects, they get a unique id

  //Listen for custom events
  socket.on("chat message", (message) => {
    console.log("Message from client: ", message);

    //Broadcast to everyone(including sender)
   // io.emit("chat message", message); // Broadcasts message to all users
    socket.broadcast.emit("chat message", message) // send message to all other users except the sender
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

// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";
//
// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // your Next.js app
//     methods: ["GET", "POST"],
//   },
// });
//
// io.on("connection", (socket) => {
//   console.log("🔥 user connected:", socket.id);
//
//   socket.on("chat message", (msg) => {
//     console.log("💬 message:", msg);
//     io.emit("chat message", msg);
//   });
// });
//
// server.listen(4000, () => {
//   console.log("🚀 Server running on http://localhost:4000");
// });
