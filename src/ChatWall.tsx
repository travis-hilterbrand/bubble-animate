import styled from "styled-components";
import type { ChatMessage } from "./types";
import { ChatBubble } from "./ChatBubble";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export type ChatWallProps = {
  chatMessages: ChatMessage[];
  onClose: (id: string) => void;
};
export const ChatWall = ({ chatMessages, onClose }: ChatWallProps) => {
  return (
    <Container>
      {chatMessages.map((item) => (
        <ChatBubble key={item.id} chatMessage={item} onClose={onClose} />
      ))}
    </Container>
  );
};
