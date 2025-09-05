"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // connect to backend server
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
    });

    // listen for chat messages
    socket.on("chat message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    // cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = io("http://localhost:4000");
    socket.emit("chat message", input);
    setInput("");
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Socket.IO Chat</h1>

      <ul className="mb-4">
        {messages.map((msg, i) => (
          <li key={i} className="border-b py-1">{msg}</li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </main>
  );
}
