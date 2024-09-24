import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react'

import PetCard from '@/Components/PetCard';
import AdminLayout from '@/Layouts/AdminLayout';


import axios from 'axios';
import Swal from 'sweetalert2';


const Adoptions = ({ mascotas }) => {

    const onPublish = async (id) => {
        Swal.fire({
            title: "Publicar mascota",
            text: "La mascota será publicada para su adopción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, publicar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if(result.isConfirmed) {
                axios.post("/panel/admin/adopciones/publicar", { mascotaId: id })
                    .then(() => {
                        Swal.fire({
                            title: "Mascota publicada!",
                            text: "La mascota ha sida publicada para su adopción.",
                            icon: "success"
                        });

                        router.reload({ only: ["mascotas"] });
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            title: "Error!",
                            text: "Algo salió mal.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    return (
        <>
            <Head title="Mis mascotas"/>
            <div className="p-12">
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
                    {mascotas.map((mascota) => (
                        <PetCard
                            key={mascota.id}
                            mascota={mascota}
                            type='admin'
                            publishFunction={() => onPublish(mascota.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

Adoptions.layout = (page) => <AdminLayout children={page}/>;

export default Adoptions