import { useEffect, useState } from "react";
import styled from "styled-components";
import type { ChatMessage } from "./types";
import { ChatBubble, type ChatBubbleProps } from "./ChatBubble";

const Container = styled.div`
  position: fixed;
  width: 200px;
  bottom: 100px;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 8px;

  @keyframes fadeInWall {
    from {
      transform: translateY(40px);
    }
    to {
      transform: translateY(0px);
    }
  }
`;

export type ChatWallProps = Pick<
  ChatBubbleProps,
  "jiggle" | "onClose" | "onFadeOutComplete"
> & {
  chatMessages: ChatMessage[];
  fadeOutId: string;
};
export const ChatWall = ({
  chatMessages,
  fadeOutId,
  ...rest
}: ChatWallProps) => {
  const [fadeInIds, setFadeInIds] = useState<string[]>([]);
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    if (chatMessages.length === 0) return;
    let timeoutId;

    const latestId = chatMessages[0].id;
    if (!fadeInIds.includes(latestId)) {
      setFadeInIds((prev) => [latestId, ...prev]);
      clearTimeout(timeoutId);
      setAnimation("fadeInWall 0.4s cubic-bezier(.23,1.01,.32,1) both");
      timeoutId = setTimeout(() => {
        setAnimation("");
      }, 400); // match animation duration
    }
  }, [chatMessages]);

  return (
    <Container data-component={"ChatWall"} style={{ animation }}>
      {chatMessages.map((item) => (
        <ChatBubble
          key={item.id}
          animate
          chatMessage={item}
          fadeOut={item.id === fadeOutId}
          {...rest}
        />
      ))}
    </Container>
  );
};
