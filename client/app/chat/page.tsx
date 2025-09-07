"use client";

import { useEffect, useState } from "react";
import { socket } from "../(utils)/socket";

export default function Chat() {
  const [chats, setChats] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const name = prompt("What is your name?");
    //connect socket
    socket.connect();
    socket.on("connect", () => {
      console.log("Client Connected: ", socket.id);
    });

    socket.on("chat message", (message: string) => {
      setChats((prevChats) => [...prevChats, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("chat message", input);
    setInput("");
  };
  return (
    <section>
      <ul>
        {chats.map((chat, index) => (
          <li key={index}>{chat}</li>
        ))}
      </ul>

      <form onSubmit={onSubmit} method="post">
        <input
          type="text"
          placeholder="Message here"
          className="border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-slate-600 p-2 rounded mx-4"
        >
          Send
        </button>
      </form>
    </section>
  );
}
