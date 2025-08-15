import { useMemo } from "react";
import styled from "styled-components";
import type { ChatMessage } from "./types";
import { ChatBubble, type ChatBubbleProps } from "./ChatBubble";

const MOVE_IN = "translateWall 0.4s cubic-bezier(.23,1.01,.32,1) both";

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

  @keyframes translateWall {
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
  "onClose" | "onFadeOutComplete"
> & {
  chatMessages: ChatMessage[];
  messageAdded: boolean;
  fadeOutFast: boolean;
  fadeOutId: string;
};
export const ChatWall = ({
  chatMessages,
  fadeOutFast,
  fadeOutId,
  messageAdded,
  ...rest
}: ChatWallProps) => {
  const animation = useMemo(() => {
    console.info(`change animation(${messageAdded},${chatMessages.length})`);
    if (messageAdded) {
      return MOVE_IN;
    }
    return "";
  }, [chatMessages, messageAdded]);

  const now = Date.now();

  return (
    <Container data-component={"ChatWall"} style={{ animation }}>
      {chatMessages.map((item) => (
        <ChatBubble
          key={item.id}
          animate
          chatMessage={item}
          fadeIn={now - item.addTime < 500}
          fadeOut={item.id === fadeOutId}
          fadeOutFast={fadeOutFast}
          {...rest}
        />
      ))}
    </Container>
  );
};
