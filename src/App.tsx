import { useState } from "react";
import "./App.css";
import type { ChatMessage } from "./types";
import { ChatWall } from "./ChatWall";
import { randomString } from "./random";
import { ChatBubble } from "./ChatBubble";
import styled from "styled-components";

const Panel = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 16px;
`;
const BottomPanel = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Input = styled.div`
  height: 48px;
  width: 800px;
  background: white;
  border-radius: 16px;
`;
const Right = styled.div`
  display: grid;
  align-items: center;
  justify-content: flex-end;
`;

export const App = () => {
  const [id, setId] = useState(2);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", message: randomString(64) },
  ]);

  return (
    <div>
      Tester
      <Panel>
        <div>
          <button
            onClick={() => {
              setChatMessages([
                ...chatMessages,
                { id: `${id}`, message: randomString(64) },
              ]);
              setId((prev) => prev + 1);
            }}
          >
            Add message
          </button>
        </div>
        <Right>
          <ChatBubble
            animate={false}
            chatMessage={{ id: "test", message: "My chat bubble" }}
            onClose={() => {}}
          />
        </Right>
      </Panel>
      <hr />
      <ChatWall
        chatMessages={chatMessages}
        onClose={(id) => {
          const newMessages = chatMessages.filter((item) => item.id !== id);
          setChatMessages(newMessages);
        }}
      />
      <BottomPanel>
        <Input />
      </BottomPanel>
    </div>
  );
};
