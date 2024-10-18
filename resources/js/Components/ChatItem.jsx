import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/es'; // Importa la localización en español

import { usePage } from "@inertiajs/react";

dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);
dayjs.locale('es'); // Establece el idioma a español

function formatoChat(fecha) {
    const fechaObjeto = dayjs(fecha);
    const ahora = dayjs();

    if (fechaObjeto.isToday()) {
        return 'hoy a ' + fechaObjeto.format('HH:mm');
    } else if (fechaObjeto.isSameOrBefore(ahora, 'week') && fechaObjeto.week() === ahora.week()) {
        return fechaObjeto.format('dddd [a las] HH:mm'); // Ejemplo: "lunes a las 14:30"
    } else {
        return fechaObjeto.format('DD/MM/YYYY HH:mm'); // Ejemplo: "17/10/2024 14:30"
    }
}

export default function ChatItem({ chat }){

    const { auth  } = usePage().props;

    return (
        <div className="flex gap-2 border-b-2">
            {chat?.person?.foto ? (
                <img
                    src={chat?.person?.foto}
                    alt='profile image'
                    className='rounded-full w-10 h-10 cursor-pointer'
                />
            ) : (
                <div
                    className='bg-blue-500 text-white font-bold flex justify-center items-center rounded-full w-10 h-10 cursor-pointer'
                >{chat?.person?.nombre?.charAt(0)}</div>
            )}
            <div className="flex flex-col gap-1">
                <p className="font-bold">{chat?.person?.nombre}</p>
                <p className="font-light text-gray-400">{auth?.user?.id === chat?.ultimo_mensaje?.user_id ? 'Tú: ' : ''}{chat?.ultimo_mensaje?.contenido}</p>
            </div>
            <p className="font-light text-gray-400">{formatoChat(chat?.ultimo_mensaje?.created_at)}</p>
        </div>
    );
}