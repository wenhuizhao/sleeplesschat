'use client';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const userAvatar = '/assets/images/user.svg';
const chatbotAvatar = '/assets/images/sleepAIbot.svg';

export interface IMessage {
  message: string;
  sender?: string;
  direction: 'incoming' | 'outgoing';
  avatar?: string;
  attributes?: any;
}

export interface ICustomMessageProps {
  message: IMessage;
  lastMessage: boolean;
  sendMessage: (text: string) => void;
  userLogin: () => void;
}

const messageAvatar = (message: IMessage): string => {
  if (message.avatar) {
    return message.avatar;
  }
  if (message.sender === 'chatbot') {
    return chatbotAvatar;
  }
  return userAvatar;
};

const CustomMessage = (props: ICustomMessageProps) => {
  const { message, lastMessage, sendMessage, userLogin } = props;

  if (lastMessage && message.attributes) {
    return (
      <div className="flex grow flex-col gap-10">
        <div className="container">{message.message}</div>

        <div className="grid grid-cols-2 gap-4">
          {message.attributes.type === 'picklist' &&
            message.attributes.lists.map((list: string, _index: number) => (
              <button
                type="button"
                key={Math.floor(Math.random() * 10000)}
                className="m-1 rounded bg-sky-300/30 p-2"
                onClick={() => sendMessage(list)}
              >
                {list}
              </button>
            ))}

          {message.attributes.type === 'user_login' && (
            <button
              type="button"
              className="m-1 rounded bg-sky-300/30 p-2"
              onClick={() => userLogin()}
            >
              Login or Register
            </button>
          )}
        </div>
      </div>
    );
  }
  return <div>{message.message}</div>;
};

export { CustomMessage, messageAvatar };
