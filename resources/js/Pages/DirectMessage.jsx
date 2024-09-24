import Authenticated from '@/Layouts/AuthenticatedLayout';
import React from 'react'

const DirectMessage = () => {
  return (
    <div>Hola adoptame</div>
  )
};

DirectMessage.layout = (page) => (
    <Authenticated 
        children={page}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Adóptame</h2>}
    />
);

export default DirectMessage