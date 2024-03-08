'use client';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';

import { handleGoogleLogin } from '../pages/login';
import type { IMessage } from './CustomMesage';
import { CustomMessage, messageAvatar } from './CustomMesage';

const errorMessage: IMessage = {
  message: 'Sorry. We have an internal error. Please try again later.',
  sender: 'chatbot',
  direction: 'incoming',
};

interface IMessageResponse {
  page: number;
  per_page: number;
  total: number;
  items: IMessage[];
  has_next: boolean;
}
const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showTyping, setShowTyping] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);
  const { user, guest } = useAuth();
  const router = useRouter();

  const fetchMessages = async (page: number) => {
    try {
      const response: { data: IMessageResponse } = await api.get(
        guest
          ? `/chat_messages?guest=${guest.name}&page=${page}`
          : `/chat_messages?page=${page}`,
      );
      setCurrentPage(response.data.page);
      setHasNext(response.data.has_next);
      setTotal(response.data.total);
      setPerPage(response.data.per_page);
      const historyMessages = response.data.items.reverse();
      console.log('historyMessages:', historyMessages);
      const allMessages =
        page === 1
          ? historyMessages
          : [...new Set(historyMessages.concat(messages))];
      console.log('allMessaeg:', allMessages);
      setMessages(allMessages);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    console.log('call useEffect');
    if (user || guest) {
      fetchMessages(1);
    }
  }, [guest, user]);

  const loadPrevPage = async () => {
    console.log('loadPrevPage, currentPage, hasNext:', currentPage, hasNext);
    try {
      if (hasNext && currentPage <= Math.floor(total / perPage)) {
        fetchMessages(currentPage + 1);
        setCurrentPage(currentPage + 1);
      }
    } catch (error: any) {
      console.log('loadPrevPage error:', error);
      setHasNext(false);
    }
  };

  const sendMessage = async (question: string) => {
    const messagesWithQuestion: IMessage[] = [
      ...messages,
      {
        message: question,
        sender: (user || guest)?.name,
        avatar: user ? user.avatar : undefined,
        direction: 'outgoing',
      },
    ];
    setMessages(messagesWithQuestion);
    setShowTyping(true);

    try {
      const response: { data: { answer: IMessage } } = await api.post(
        '/message',
        {
          question,
          guest: guest?.name,
        },
      );
      setShowTyping(false);
      setMessages([...messagesWithQuestion, response.data.answer]);
    } catch (error: any) {
      setShowTyping(false);
      setMessages([...messagesWithQuestion, errorMessage]);
      if (error.response && error.response.status === 401) {
        router.push('/login');
      }
    }
  };

  const userLogin = () => {
    console.log('userlogin');
    handleGoogleLogin();
  };

  // console.log('renderChat, messages', messages);
  return (
    <div className="max-h-screen min-h-96">
      <p className="font-bold">Welcome to Your Journey Towards Better Sleep!</p>
      <p className="text-base">
        Struggling to drift into a peaceful slumber? Worried about restless
        nights? Let&lsquo;s put those concerns to rest. Introducing our Good
        Night Insomnia Chatbot - your personal sleep assistant. Equipped with
        the most comprehensive sleep knowledge available, our chatbot is here to
        offer tailored advice and effective solutions to enhance your sleep
        quality.
      </p>
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              showTyping ? (
                <TypingIndicator content="Chatbot is typing" />
              ) : null
            }
            onYReachStart={() => loadPrevPage()}
          >
            {messages.map((message, index) => (
              <Message
                model={{
                  direction: message.direction,
                  type: 'custom',
                  position: 'normal',
                }}
                className="w-full"
                key={Math.floor(Math.random() * 10000)}
              >
                <Avatar src={messageAvatar(message)} name={message.sender} />
                <Message.CustomContent>
                  <CustomMessage
                    message={message}
                    key={Math.floor(Math.random() * 10000)}
                    lastMessage={index === messages.length - 1}
                    sendMessage={sendMessage}
                    userLogin={userLogin}
                  />
                </Message.CustomContent>
              </Message>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={(textContent) => sendMessage(textContent)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export { Chat };
