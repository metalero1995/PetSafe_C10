import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isToday from 'dayjs/plugin/isToday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import 'dayjs/locale/es'; // Importa la localización en español

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);
dayjs.locale('es'); // Establece el idioma a español

export default function formatoChat(fecha) {
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