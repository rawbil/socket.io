# Socket.io

- **Socket.io** is a library that enables real-time communication between the server and client.

_Server_

```
import express from 'express';
const app = express.app();
import {Server} from 'socket.io';
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    }
});

io.connection("connection") // Initializes a new socket.io() connection
socket.on("message", () => {}) // Listens for message events
io.emit("message", () => {}) // Sends message to everyone(client)
socket.on("disconnect") // closes the connection
```

_Client_

```
const socket = io("http://localhost:5000") // Initialize connection to server

useEffect(() => {
    // connect to socket
    socket.on("connect", () => {
    console.log("Connected to server:", socket.id);
    });

    socket.on("message", () => {}) // listen for message
}, [])

socket.emit("message", () => {}) // send message to server

```
