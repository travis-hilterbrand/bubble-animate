import styled from "styled-components";
import type { ChatMessage } from "./types";
import { useEffect, useState } from "react";

const Container = styled.div<{ $animate: boolean }>`
  box-shadow: 0px 6px 24px rgba(16, 16, 23, 0.08);
  max-width: 200px;
  border-radius: 2rem 0.5rem 1.5rem 2rem;
  padding: 0.75rem 1rem 0.875rem 1.25rem;
  font-size: 14px;
  font-weight: 400;
  background: rgb(221, 235, 255);
  color: #34354c;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;

  ${(props) =>
    props.$animate &&
    `
  /*animation: fadeInBubble 1.2s cubic-bezier(0.4, 2, 0.6, 1) forwards;*/
  animation: fadeInBubble 350ms linear forwards;
  opacity: 0;

  @keyframes fadeInBubble {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
      `}
`;

export type ChatBubbleProps = {
  animate: boolean;
  chatMessage: ChatMessage;
  onClose: (id: string) => void;
};
export const ChatBubble = (props: ChatBubbleProps) => {
  const { animate, chatMessage, onClose } = props;

  const [id] = useState(chatMessage.id);
  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose(id);
    }, 5 * 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [id, onClose]);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Container
      $animate={animate}
      data-id={chatMessage.id}
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      {`${chatMessage.id} - ${chatMessage.message}`}
    </Container>
  );
};
