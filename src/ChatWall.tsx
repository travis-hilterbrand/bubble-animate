import { useMemo } from "react";
import styled from "styled-components";
import type { ChatMessage } from "./types";
import { ChatBubble, type ChatBubbleProps } from "./ChatBubble";

const FADE_IN = "fadeInWall 350ms linear";
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

  @keyframes fadeInWall {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
  fadeOutId: string;
};
export const ChatWall = ({
  chatMessages,
  fadeOutId,
  messageAdded,
  ...rest
}: ChatWallProps) => {
  const animation = useMemo(() => {
    console.info(`change animation(${messageAdded},${chatMessages.length})`);
    if (chatMessages.length === 1 && messageAdded) {
      return [FADE_IN, MOVE_IN].join(",");
    } else if (messageAdded) {
      return MOVE_IN;
    }
    return "";
  }, [chatMessages, messageAdded]);

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
