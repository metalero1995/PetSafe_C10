import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

const UpdateProfileImage = ({ profileImage, coverImage }) => {

  const [isSubmiting, setIsSubmiting] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleChange = (e, setValue) => {
    const selectedFile = e.target.files[0];
    setValue(selectedFile);
  };

  const handleSubmit = () => {
    setIsSubmiting(true);
    const formData = new FormData();

    if(photo) {
      formData.append("photo", photo);
    };

    if(coverPhoto) {
      formData.append("cover_photo", coverPhoto);
    };

    console.log([...formData]);

    axios.post("/org/profile/photo", formData)
      .then(() => {
        toast.success("Imagenes actualizadas correctamente");
        router.reload();
      })
      .catch(() => {
        toast.error("Ocurrió un error");
      })
      .finally(() => {
        setIsSubmiting(false);
        setPhoto(null);
        setCoverPhoto(null);
      });
  }

  const deletePhoto = () => {
    Swal.fire({
      title: "Eliminar imagen de perfil",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if(result.isConfirmed) {

        axios.delete("/org/profile/deletePhoto")
        .then(() => {
          toast.success("Imagen de perfil eliminada");
          router.reload();
        })
        .catch(() => {
          toast.error("Ocurrió un error");
        });
        
      }
    })
  }

  const deleteCoverPhoto = () => {
    Swal.fire({
      title: "Eliminar imagen de portada",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if(result.isConfirmed) {

        axios.delete("/org/profile/deleteCover")
        .then(() => {
          toast.success("Imagen de portada eliminada");
          router.reload();
        })
        .catch(() => {
          toast.error("Ocurrió un error");
        });

      };
    });
  }

  return (
    <section
      className="max-w-xl"
    >
      <header>
        <h2 className="text-lg font-medium text-gray-900">Foto de perfil y de portada</h2>

        <p className="mt-1 text-sm text-gray-600">
          Actualiza tu foto de perfil y de portada
        </p>
      </header>

      <form
        className="mt-6 space-y-6"
      >
        <div>
          <p
            className="mb-2 font-bold text-sm"
          >Imagen de perfil</p>
          {profileImage ? (
            <>
              <img
                src={'http://localhost:8000/'+profileImage}
                className="h-28 w-28 rounded-full aspect-square"
              />
              <button
                className="mt-10 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-red-600"
                type="button"
                onClick={deletePhoto}
              >Eliminar</button>
            </>
          ) : (
            <div>
              {photo && (
                <div className="relative inline-block">
                  <img
                    src={URL.createObjectURL(photo)}
                    className="w-64 h-64 rounded-lg"
                  />
                  <button 
                    className="absolute flex justify-center items-center top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none h-6 w-6 aspect-square"
                    aria-label="Eliminar"
                    onClick={() => setPhoto("")}
                  >
                    ✕
                  </button>
                </div>
              )}
              {!photo && (
                <>
                  <input 
                    type="file" 
                    id="photo" 
                    className="hidden"
                    onChange={(e) => handleChange(e, setPhoto)}
                    disabled={isSubmiting}
                  />

                  <label htmlFor="photo" className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-600">
                    Seleccionar imagen
                  </label>
                </>
              )}
            </div>
          )}
        </div>
        <div>
          <p
            className="mb-2 font-bold text-sm"
          >Imagen de portada</p>
          {coverImage ? (
            <>
              <img
                src={'http://localhost:8000/'+coverImage}
                className="h-28 w-28 rounded-full aspect-square"
              />
              <button
                className="mt-10 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-red-600"
                type="button"
                onClick={deleteCoverPhoto}
              >Eliminar</button>
            </>
          ) : (
            <div>
              {coverPhoto && (
                <div className="relative inline-block">
                  <img
                    src={URL.createObjectURL(coverPhoto)}
                    className="w-64 h-64 rounded-lg"
                  />
                  <button 
                    className="absolute flex justify-center items-center top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none h-6 w-6 aspect-square"
                    aria-label="Eliminar"
                    onClick={() => setCoverPhoto("")}
                  >
                    ✕
                  </button>
                </div>
              )}
              {!coverPhoto && (
                <>
                  <input 
                    type="file" 
                    id="cover_photo" 
                    className="hidden"
                    onChange={(e) => handleChange(e, setCoverPhoto)}
                    disabled={isSubmiting}
                  />

                  <label htmlFor="cover_photo" className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-600">
                    Seleccionar imagen
                  </label>
                </>
              )}
            </div>
          )}
          {photo || coverPhoto ? (
            <button
              className="mt-10 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-green-600"
              type="button"
              disabled={isSubmiting}
              onClick={handleSubmit}
            >Guardar cambios</button>
          ) : null}
        </div>
      </form>

    </section>
  );
}

export default UpdateProfileImage