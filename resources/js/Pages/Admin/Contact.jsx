
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

const Contact = ({ contacts }) => {
    console.log(contacts);
    return (
        <>
            <Head title="Contacto"/>
            <div
                className="p-12"
            >
                {contacts?.length > 0 ? (
                    contacts?.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-md shadow-md bg-white p-2"
                        >
                            <p>Nombre: {item?.name}</p>
                            <p>Correo: {item?.email}</p>
                            <p>Teléfono: {item?.telefono}</p>
                            <p>Nombre: {item?.name}</p>
                            <p>Asunto: {item?.subject}</p>
                        </div>
                    ))
                ) : (
                    <div>No hay registros</div>
                )}
            </div>
        </>
    )
}

Contact.layout = (page) => (
    <AdminLayout 
        children={page}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Contactos</h2>}
    />
);

export default Contact;