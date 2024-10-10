import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";


const Mascota = ({ mascota }) => {
    return (
        <>
            <Head title="Mascotas en adopción" />
            
            <div className="p-12 mt-10">
            <p
                className="text-3xl font-bold text-gray-700 my-5"
            >{mascota.tipo.nombre}</p>
            </div>
        </>
    );
}

Mascota.layout = page => (
    <Guest
        children={page}
    />
);

export default Mascota;