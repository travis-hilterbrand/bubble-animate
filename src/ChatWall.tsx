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
  return (
    <Container>
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
