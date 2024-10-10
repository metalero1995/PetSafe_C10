import { useState } from "react";

import EditAdoptionModal from "@/Components/Modals/EditAdoptionModal";

import PetCard from "@/Components/PetCard";

import { Head } from "@inertiajs/react";
import { router } from '@inertiajs/react';


import Swal from 'sweetalert2'
import axios from "axios";
import Guest from "@/Layouts/GuestLayout";

const MyAdoptions = ({ mascotas }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentAdoption, setCurrentAdoption] = useState(null);

  const onDelete = (id) => {
    Swal.fire({
        title: "Eliminar mascota",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {

            axios.delete(`/adopcion/eliminar/${id}`)
                .then(() => {
                    Swal.fire({
                        title: "Eliminado!",
                        text: "La adopción ha sido eliminada.",
                        icon: "success"
                    });

                    router.reload();
                })
                .catch(() => {
                    Swal.fire({
                        title: "Error!",
                        text: "Algo salió mal.",
                        icon: "error"
                    });
                });
        }
    });
  };

  return (
    <>
        <Head title="Mis mascotas"/>
        <EditAdoptionModal 
            open={openEditModal} 
            onClose={() => { 
                setOpenEditModal(false);
                setCurrentAdoption(null);
            }}
            adoption={currentAdoption}
        />

        <div className="p-12 mt-10">
            <p
                className="text-xl font-bold text-gray-700 my-5"
            >Mis mascotas</p>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {mascotas.map((mascota) => (
                    <PetCard
                        key={mascota.id}
                        mascota={mascota}
                        type="private"
                        editFunction={() => { 
                            setOpenEditModal(true);
                            setCurrentAdoption(mascota);
                        }}
                        deleteFunction={() => onDelete(mascota.id)}
                    />
                ))}
            </div>
        </div>
    </>
  )
}

MyAdoptions.layout = (page) => (
    <Guest 
        children={page}
    />
);

export default MyAdoptions