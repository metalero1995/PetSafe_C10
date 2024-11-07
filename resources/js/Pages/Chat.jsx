import { useState } from 'react';

import Guest from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'

import formatoChat from '@/libs/formatoChat'
import ChatInput from '@/Components/Form/ChatInput';

const Chat = ({ chat }) => {
  const [loading, setLoading] = useState(false);

  const sendMessage = (message) => {
    setLoading(true);

    axios.post("/send/message",  { contenido: message, mascotaId: chat.mascota.id })
      .then(() => {

      })
      .catch(() => {
          
      })
      .finally(() => {
          setLoading(false);
      });
  }

  return (
    <>
      <Head
        title={'Chat con '+ chat?.person?.nombre}
      />
      <div className="p-12 mt-10">
        <h1
          className="text-3xl font-bold text-gray-700 my-5"
        >
          {chat?.person?.nombre}
        </h1>
        <div className="space-y-3">
          {chat?.mensajes?.map((mensaje) => (
            <div
              className={`flex ${mensaje.user_id !== chat?.person?.id ? 'flex-row-reverse' : ''}`}
              key={mensaje?.id}
            >
              <div
                className={`pr-20 pl-2 py-2 text-white rounded-xl ${mensaje.user_id !== chat?.person?.id ? 'bg-gray-300' : 'bg-blue-300'}`}
              >
                <p
                  className="text-lg"
                >{mensaje?.contenido}</p>
                <p
                  className="text-xs"
                >
                  {formatoChat(mensaje?.created_at)}
                </p>
              </div>
            </div>
          ))}
          <ChatInput
            disabled={loading}
            onSendMessage={sendMessage}
          />
        </div>
      </div>
    </>
  )
}

Chat.layout = page => (
  <Guest
    children={page}
  />
);

export default Chat