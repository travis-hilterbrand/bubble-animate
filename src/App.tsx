import { useState } from "react";
import "./App.css";
import type { ChatMessage } from "./types";
import { ChatWall } from "./ChatWall";
import { randomString } from "./random";

export const App = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: randomString(16, false), message: randomString(64) },
  ]);

  return (
    <div>
      Tester
      <div>
        <button
          onClick={() => {
            setChatMessages([
              ...chatMessages,
              { id: randomString(16), message: randomString(64) },
            ]);
          }}
        >
          Add message
        </button>
      </div>
      <hr />
      <ChatWall
        chatMessages={chatMessages}
        onClose={(id) => {
          const newMessages = chatMessages.filter((item) => item.id !== id);
          setChatMessages(newMessages);
        }}
      />
    </div>
  );
};
