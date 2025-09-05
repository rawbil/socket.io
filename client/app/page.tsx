"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ChatHome() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const socket = io(process.env.NEXT_PUBLIC_API_URL || "http:localhost:5000");

  useEffect(() => {
    //connect to backend server
    socket.on("connect", () => {
      console.log(`Socket connected to server: ${socket.id}`);
    });

    //listen for chat messages
    socket.on("chat message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    //cleanup on mount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("chat message", input);
    setInput("");
  };

  return (
    <section>
      <h2>Socket.IO Chat</h2>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          placeholder="Type message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </section>
  );
}
