import { io } from "socket.io-client";

// undefined means it will be computed from window.location
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const socket = io(URL, {
  autoConnect: false, // call socket.connect() to connect
});
