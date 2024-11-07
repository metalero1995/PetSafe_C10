import { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


import axios from "axios";

import toast from 'react-hot-toast';

import ModalForm from "../ModalForm";
import Dropzone from "@/Components/Dropzone";
import TextArea from "@/Components/Form/TextArea";
import { router } from '@inertiajs/react';

const schema = z.object({
  imagenes: z.array(z.instanceof(File))
    .min(1, { message: "Debes subir al menos 1 imagen" })
    .max(5, { message: "No puedes subir más de 5 imágenes" })
    .refine((files) => files.every(file => file.size <= 5 * 1024 * 1024), { 
      message: "Cada archivo debe ser menor a 5 MB" 
    })
    .refine((files) => files.every(file => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)), {
      message: "Solo se permiten archivos JPEG, PNG o GIF",
    }),
  contenido: z.string().min(10, { message: 'Ecribe al menos 10 caracteres' }).max(280, { message: 'No puedes escribir más de  280 caracteres' }),
});

const PublicacionFormModal = ({
  open,
  onClose,
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      imagenes: [],
    }
  });

  const submitForm = (data) => {

    const formData = new FormData();
        
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
            
        if (value instanceof Array) {
          for (let i = 0; i < value.length; i++) {
            formData.append(key + '[]', value[i]);
          }
        } else {
          formData.append(key, value);
        }
      }
    }

    axios.post("/org/post", formData)
      .then(() => {
        toast.success("Publicación creada");
        reset();
        onClose();
        router.reload();
      })
      .catch(() => {
        toast.error("Ocurrió un error");
      });
  };

  const images = watch('imagenes');

  const secondaryAction = () => {
    reset();
    onClose();
  };

  const primaryAction = () => {
    handleSubmit(submitForm)();
  };

  const removeImage = (name) => {
    const newFiles = [...images].filter((file) => file.name !== name);
    setValue('imagenes', newFiles, { shouldValidate: true });
  }

  const uploadImages = useCallback((files) => {
    const newFiles = [...images, ...files]
    setValue('imagenes', newFiles, { shouldValidate: true })
  }, [images])

  return (
    <ModalForm
      title="Crear publicación"
      show={open}
      onClose={onClose}
      closeable={false}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      primaryLabel="Publicar"
      secondaryLabel="Cancelar"
    >
      <form
        className="space-y-6 px-5 py-2"
      >
        <TextArea
          id="contenido"
          label="Contenido"
          required
          type="text"
          errors={errors["contenido"]}
          disabled={isSubmitting}
          register={register}
        />
        <Dropzone
          uploadImages={uploadImages}
          removeImage={removeImage}
          images={images}
          errors={errors["imagenes"]}
          isDisabled={isSubmitting}
          inputText="Presiona o arrastra imagenes de tu mascota (máximo 5 imágenes)"
        />
      </form>
    </ModalForm>
  )
}

export default PublicacionFormModal