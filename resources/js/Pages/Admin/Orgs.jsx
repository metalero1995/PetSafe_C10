import OrgFormModal from '@/Components/Modals/OrgFormModal';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react'

const Orgs = ({ orgs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateClick = () => {
    setIsOpen(true); // Cambia el estado al hacer clic en el botón
  };

  return (
    <>
      <Head
        title="Organizaciones"
      />
      <OrgFormModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <AdminLayout
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Organizaciones</h2>
            <button
              className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
              onClick={handleCreateClick}
            >Crear</button>
          </div>
        }
      >
        <div className="p-12">
          {orgs?.length > 0 ? (
            orgs?.map((item) => (
                <div
                    key={item?.id}
                    className="rounded-md shadow-md bg-white p-2"
                >
                  <p>Nombre: {item?.nombre_organizacion}</p>
                  <p>Teléfono: {item?.telefono}</p>
                  <p>Nombre: {item?.ubicacion}</p>
                </div>
            ))
          ) : (
            <div>No hay registros</div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default Orgs