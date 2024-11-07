import { router } from '@inertiajs/react'

import { usePage } from "@inertiajs/react";

import formatoChat from '@/libs/formatoChat';


export default function ChatItem({ chat }){

    const { auth  } = usePage().props;

    const onClick = (e) => {
        e.stopPropagation();
        router.visit(`/chats/${chat?.id}`);
    }

    return (
        <div 
            className="flex items-center gap-2 border-b-2 py-2 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center gap-2 w-1/3">
                {chat?.person?.foto ? (
                    <img
                        src={chat?.person?.foto}
                        alt='profile image'
                        className='rounded-full w-10 h-10'
                    />
                ) : (
                    <div
                        className='bg-blue-500 text-white font-bold flex justify-center items-center rounded-full w-10 h-10 aspect-square text-sm'
                    >{chat?.person?.nombre?.charAt(0)}</div>
                )}
                <p className="font-bold truncate">{chat?.person?.nombre}</p>
            </div>
            <p className="font-light text-gray-400 w-1/3">{auth?.user?.id === chat?.ultimo_mensaje?.user_id ? 'Tú: ' : ''}{chat?.ultimo_mensaje?.contenido}</p>
            <p className="font-light text-gray-400 w-1/3">{formatoChat(chat?.ultimo_mensaje?.created_at)}</p>
        </div>
    );
}