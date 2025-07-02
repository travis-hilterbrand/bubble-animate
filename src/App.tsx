import { useEffect, useRef, useState } from "react";
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
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

  const addNewMessage = () => {
    if (!chatMessages.length) {
      showTime.current = new Date();
    }

    setChatMessages((prev) => {
      const newMessages = [...prev, { id: `${id}`, message: randomString(64) }];
      return newMessages.slice(-3);
    });
    setId((prev) => prev + 1);
  };
  const removeMessageStart = (id: string) => {
    setFadeOutId(id);
    showTime.current = new Date();
  };
  const removeMessageEnd = (id: string) => {
    const newMessages = chatMessages.filter((item) => item.id !== id);
    setChatMessages(newMessages);
  };

  const showTime = useRef(new Date());
  const [fadeOutId, setFadeOutId] = useState("");
  useEffect(() => {
    const timerId = setInterval(() => {
      if (new Date().getTime() > showTime.current.getTime() + 5000) {
        if (chatMessages.length) {
          removeMessageStart(chatMessages[0].id);
        }
      }
    }, 150);
    return () => {
      clearInterval(timerId);
    };
  });

  const [jiggle, setJiggle] = useState(false);

  return (
    <div>
      Bubble tester
      <Panel>
        <div>
          <label>
            <input
              type="checkbox"
              checked={jiggle}
              onChange={() => setJiggle((prev) => !prev)}
            />
            Jiggle
          </label>
        </div>
        <Right>
          <ChatBubble
            animate={false}
            fadeOut={false}
            jiggle={false}
            chatMessage={{ id: "test", message: "My chat bubble" }}
            onClose={() => {}}
            onFadeOutComplete={() => {}}
          />
        </Right>
      </Panel>
      <hr />
      <ChatWall
        chatMessages={chatMessages}
        fadeOutId={fadeOutId}
        jiggle={jiggle}
        onClose={removeMessageStart}
        onFadeOutComplete={(id) => {
          removeMessageEnd(id);
        }}
      />
      <BottomPanel>
        <Input>
          <button onClick={() => addNewMessage()}>Add message</button>
        </Input>
      </BottomPanel>
    </div>
  );
};
