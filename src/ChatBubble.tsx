import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import type { ChatMessage } from "./types";

const FADE_IN = "fadeInBubble 500ms cubic-bezier(0.4, 1, 0.6, 1) forwards";
const FADE_IN_JIGGLE =
  "fadeInBubble 1.2s cubic-bezier(0.4, 2, 0.6, 1) forwards";
//const FADE_OUT = "fadeOutBubble 300ms linear forwards";

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
  cursor: pointer;

  ${(props) =>
    props.$animate &&
    `
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
    @keyframes fadeOutBubble {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
`}
`;

export type ChatBubbleProps = {
  animate: boolean;
  chatMessage: ChatMessage;
  jiggle: boolean;
  onClose: (id: string) => void;
};
export const ChatBubble = (props: ChatBubbleProps) => {
  const { animate, chatMessage, jiggle, onClose } = props;

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  const animation: string = useMemo(() => {
    if (animate) {
      return jiggle ? FADE_IN_JIGGLE : FADE_IN;
    }
    return "";
  }, [animate, jiggle]);

  return (
    <Container
      $animate={animate}
      data-id={chatMessage.id}
      style={{
        animation,
        opacity: visible ? 1 : 0,
      }}
      onClick={() => onClose(chatMessage.id)}
    >
      {`${chatMessage.id} - ${chatMessage.message}`}
    </Container>
  );
};
