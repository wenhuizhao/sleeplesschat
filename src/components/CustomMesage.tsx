'use client';

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { Avatar, MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
   
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';

const userAvatar = "/assets/images/user.svg";
const chatbotAvatar = "/assets/images/sleepAIbot.svg";

export interface IMessage {
  message: string;
  sender?: string,
  direction: 'incoming' | 'outgoing';
  avatar?: string,
  attributes?: any,
}

export interface ICustomMessageProps {
  message: IMessage,
  lastMessage: boolean,
  sendMessage: (text: string) => void
  userLogin: () => void
}

const messageAvatar = (message: IMessage): string => {
  if (message.avatar) {
    return message.avatar;
  }
  if (message.sender === "chatbot") {
    return chatbotAvatar;
  }
  return userAvatar;
}


 const CustomMessage = (props: ICustomMessageProps) => {
  const { message, lastMessage, sendMessage, userLogin } = props;
  
  if (lastMessage && message.attributes) {
    return (
      <div className="flex flex-grow flex-col gap-10">
          <div className="container">
            {message.message}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            { message.attributes.type === 'picklist' && message.attributes.lists.map((list: string, index: number)=>(

              <button key={index} className="bg-sky-300/30 mx-1 my-1 py-2 px-2 rounded" onClick={()=> sendMessage(list)}>{list}</button>
            ))}

            { message.attributes.type === 'user_login' && 
               <button className="bg-sky-300/30 mx-1 my-1 py-2 px-2 rounded" onClick={()=> userLogin()}>Login or Register</button>
            }
          </div>
        </div>
      )
    } else {
    return (
      <div>
        {message.message}
      </div>
    )
  }
}

export { CustomMessage, messageAvatar }
