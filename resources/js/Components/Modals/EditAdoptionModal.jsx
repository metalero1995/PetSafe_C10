import Select from "@/Components/Select";
import Dropzone from "@/Components/Dropzone";
import Input from "@/Components/Form/Input";
import TextArea from "@/Components/Form/TextArea";

import ModalForm from "../ModalForm";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import axios from "axios";
import toast from 'react-hot-toast';
import Swal from "sweetalert2";

import { useCallback, useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";

const schema = z.object({
    imagenes: z.array(z.instanceof(File))
      .min(1, { message: "Debes subir al menos 1 imagen" })
      .max(5, { message: "No puedes subir más de 5 imágenes" })
      .refine((files) => files.every(file => file.size <= 5 * 1024 * 1024), { 
        message: "Cada archivo debe ser menor a 5 MB" 
      })
      .refine((files) => files.every(file => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)), {
        message: "Solo se permiten archivos JPEG, PNG o GIF",
      }).optional(),
    deletedImages: z.array(
        z.number().int().positive()
    ).optional(),
    tipo_id: z.enum(['1', '2'], {
        errorMap: () => ({ message: 'Selecciona un tipo válido' }),
    }),
    sexo: z.enum(['Macho', 'Hembra'], {
        errorMap: () => ({ message: 'Selecciona un tipo válido' }),
    }),
    edad: z.coerce.number().min(1, { message: 'La edad debe ser mayor a 0' }).max(100, { message: 'La edad máxima es 100 meses' }),
    peso: z.coerce.number().min(1, { message: 'El peso debe ser mayor que 0' }),
    descripcion: z.string().min(10, { message: 'La descripción debe tener al menos 10 caracteres' }).max(280, { message: 'La descripción no puede tener más de 280 caracteres' }),
  });

export default function EditAdoptionModal({
    open,
    onClose,
    adoption,
})
{
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const images = watch('imagenes');

    const [adoptionImages, setAdoptionImages] = useState([]);

    useEffect(() => {
        if(adoption) {
            setValue('sexo', adoption?.sexo);
            setValue('tipo_id', adoption?.tipo?.id);
            setValue('edad', adoption?.edad);
            setValue('peso', adoption?.peso)
            setValue('descripcion', adoption?.descripcion);
            setValue('deletedImages', []);
            setAdoptionImages(adoption?.imagenes);
        }
    }, [adoption]);

    const allImages = useMemo(() => {
        return [...(adoptionImages || []), ...(images || [])];
    }, [images, adoption, adoptionImages]);

    const submitForm = (data) => {
        const formData = new FormData();
        formData.append('_method', 'patch');

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const value = data[key];
              
              // Si el campo es un array de archivos (FileList), iteramos sobre él
              if (value instanceof Array) {
                for (let i = 0; i < value.length; i++) {
                  formData.append(key + '[]', value[i]); // Añadimos archivos al FormData con el sufijo '[]'
                }
              } else {
                // Para los campos normales, simplemente los añadimos al FormData
                formData.append(key, value);
              }
            }
        }

        axios.post(`/dar-adopcion/update/${adoption?.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
          .then(() => {
            toast.success("Adopción registrada");
            reset();
            onClose();
            router.reload();
          })
          .catch(() => {
            toast.error("Ocurrió un error");
          });
    };

    const secondaryAction = () => {
        reset();
        setAdoptionImages([]);
        onClose();
    };

    const primaryAction = () => {
        handleSubmit(submitForm)();
    };

    const removeImage = (id) => {
        if([...images || []].some(i => i.name == id)) {
            const newImages = [...images].filter(item => item.name !== id);
            setValue('imagenes', newImages, { shouldValidate: true });
        };

        if([...adoptionImages || []].some(i => i.id == id)) {
            Swal.fire({
                title: "Eliminar imagen",
                text: "¿Quieres eliminar esta imagen?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if(result.isConfirmed) {
                    const newImages = [...adoptionImages].filter(item => item.id !== id);
                    setAdoptionImages(newImages);

                    const deletedImages = getValues('deletedImages');
                    setValue('deletedImages', [...deletedImages, id]);
                };
            });
        };
    };

    const uploadImages = useCallback((files) => {
        const newFiles = [...(images || []), ...files];
        setValue('imagenes', newFiles, { shouldValidate: true });
    }, [images]);

    return (
        <ModalForm 
            title="Editar información de adopción"
            show={open}
            closeable={false}
            onClose={onClose}
            description="Completa la información de la mascota que deseas dar en adopción"
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            primaryLabel="Enviar"
            secondaryLabel="Cancelar"
        >
            <form className="space-y-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        id="tipo_id"
                        className="mt-1 block w-full"
                        label="Selecciona el tipo de tu mascota"
                        required
                        autoComplete="tipo"
                        errors={errors["tipo_id"]}
                        disabled={isSubmitting}
                        register={register}
                        options={[{
                            id: '1',
                            nombre: "Perro"
                        }, {
                            id: '2',
                            nombre: "Gato"
                        }]}
                    />

                    <Select
                        id="sexo"
                        className="mt-1 block w-full"
                        label="Selecciona el sexo de tu mascota"
                        required
                        autoComplete="sexo"
                        errors={errors["sexo"]}
                        disabled={isSubmitting}
                        register={register}
                        options={[{
                            id: 'Macho',
                            nombre: "Macho"
                        }, {
                            id: 'Hembra',
                            nombre: "Hembra"
                        }]}
                    />
                                    
                    <Input
                        id="edad"
                        label="Edad"
                        required
                        type="number"
                        errors={errors["edad"]}
                        disabled={isSubmitting}
                        register={register}
                    />

                    <Input
                        id="peso"
                        label="Peso"
                        required
                        type="number"
                        errors={errors["peso"]}
                        disabled={isSubmitting}
                        register={register}
                    />
                </div>

                <TextArea
                    id="descripcion"
                    label="Descripción"
                    required
                    type="text"
                    errors={errors["descripcion"]}
                    disabled={isSubmitting}
                    register={register}
                />

                <Dropzone
                    uploadImages={uploadImages}
                    removeImage={removeImage}
                    images={allImages}
                    errors={errors["imagenes"]}
                    isDisabled={isSubmitting}
                />
            </form>
        </ModalForm>
    );
};