'use client';

import {
  MainContainer,
  MessageContainer,
  MessageHeader,
  MessageInput,
  MessageList,
} from '@minchat/react-chat-ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';

interface MessageUser {
  id?: string;
  name?: string;
  avatar?: string;
}
interface Message {
  text: string;
  user: MessageUser | undefined;
  type?: 'incoming' | 'outgoing';
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user, guest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response: { data: { messages: Message[] } } = await api.get(
          user || !guest
            ? '/chat_messages'
            : `/chat_messages?guest=${guest.name}`,
        );
        setMessages(response.data.messages);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          router.push('/login');
        }
      }
    };
    fetchMessages();
  }, [guest, user]);

  const sendMessage = async (question: string) => {
    const messagesWithQuestion: Message[] = [
      ...messages,
      {
        text: question,
        type: 'outgoing',
        user: {
          id: (user || guest)?.name,
          name: (user || guest)?.name,
        },
      },
    ];
    setMessages(messagesWithQuestion);

    try {
      const response: { data: { answer: Message } } = await api.post(
        '/message',
        {
          question,
          guest: guest?.name,
        },
      );
      setMessages([...messagesWithQuestion, response.data.answer]);
    } catch (error: any) {
      if (error.response.status === 401) {
        router.push('/login');
      }
    }
  };

  // console.log('renderChat, messages', messages);
  return (
    <div className="h-full">
      <MainContainer style={{ height: '80vh' }}>
        <MessageContainer>
          <MessageHeader />
          <MessageList
            currentUserId="dan"
            // @ts-ignore
            messages={messages}
          />
          <MessageInput
            placeholder="Type message here"
            onSendMessage={(message) => sendMessage(message)}
          />
        </MessageContainer>
      </MainContainer>
    </div>
  );
};

export { Chat };
