import { useEffect, useRef, useState } from "react";
import "./App.css";
import type { ChatMessage } from "./types";
import { ChatWall } from "./ChatWall";
import { randomString } from "./random";
import { ChatBubble } from "./ChatBubble";
import styled from "styled-components";

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: "1", message: randomString(64) },
];

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
  // order is oldest to newest
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [messageAdded, setMessageAdded] = useState(false);

  const showTime = useRef(new Date());
  const resetShowTime = () => {
    showTime.current = new Date();
  };

  const timeoutId = useRef<number | undefined>(undefined);
  const [fadeOutMessages, setFadeOutMessages] = useState<string[]>([]);
  const addNewMessage = () => {
    if (!chatMessages.length) {
      resetShowTime();
    }

    setMessageAdded(true);
    window.clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(() => {
      setMessageAdded(false);
    }, 400);

    setChatMessages((prev) => {
      const newMessages = [...prev, { id: `${id}`, message: randomString(64) }];
      return newMessages.slice(-4);
    });
    setId((prev) => prev + 1);
  };
  const removeMessages = (ids: string[]) => {
    console.info(`removeMessages(${ids})`);
    const newMessages = chatMessages.filter((item) => !ids.includes(item.id));
    setChatMessages(newMessages);
  };

  const handleCloseClick = (id: string) => {
    const index = chatMessages.findIndex((item) => item.id === id);
    if (chatMessages[index]) {
      const messagesToRemove = chatMessages
        .slice(0, index + 1)
        .map((item) => item.id);
      if (messagesToRemove.length > 0) {
        setFadeOutMessages(messagesToRemove);
      }
    }
    resetShowTime();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      if (new Date().getTime() > showTime.current.getTime() + 5000) {
        if (chatMessages.length && fadeOutMessages.length === 0) {
          setFadeOutMessages([chatMessages[0].id]);
          resetShowTime();
        }
      }
    }, 150);
    return () => {
      clearInterval(timerId);
    };
  });

  return (
    <div>
      Bubble tester
      <Panel>
        <div></div>
        <Right>
          <ChatBubble
            allowFadeIn={false}
            animate={false}
            fadeOut={false}
            chatMessage={{ id: "test", message: "My chat bubble" }}
            onClose={() => {}}
            onFadeOutComplete={() => {}}
          />
        </Right>
      </Panel>
      <hr />
      <ChatWall
        chatMessages={[...chatMessages].reverse()}
        fadeOutId={fadeOutMessages[0]}
        messageAdded={messageAdded}
        onClose={handleCloseClick}
        onFadeOutComplete={(id) => {
          const newFadeOutMessages = [...fadeOutMessages];
          newFadeOutMessages.shift();
          setFadeOutMessages(newFadeOutMessages);

          removeMessages([id]);
          resetShowTime();
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
