import Authenticated from "@/Layouts/AuthenticatedLayout";

import Select from "@/Components/Select";
import Dropzone from "@/Components/Dropzone";
import Input from "@/Components/Form/Input";
import TextArea from "@/Components/Form/TextArea";


import { Head } from "@inertiajs/react";
import { router } from '@inertiajs/react'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


import axios from "axios";

import { toast } from "react-toastify";

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
    tipo: z.enum(['1', '2'], {
        errorMap: () => ({ message: 'Selecciona un tipo válido' }),
    }),
    sexo: z.enum(['Macho', 'Hembra'], {
        errorMap: () => ({ message: 'Selecciona un tipo válido' }),
    }),
    edad: z.coerce.number().min(1, { message: 'La edad debe ser mayor a 0' }).max(100, { message: 'La edad máxima es 100 meses' }),
    peso: z.coerce.number().min(1, { message: 'El peso debe ser mayor que 0' }),
    descripcion: z.string().min(10, { message: 'La descripción debe tener al menos 10 caracteres' }).max(280, { message: 'La descripción no puede tener más de 280 caracteres' }),
});

const PostAdoptionForm = () =>
{

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            imagenes: [],
            tipo: '1',
            sexo: 'Macho'
        }
    });

    const submitForm = async (data) => {

        const formData = new FormData();
        
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

        try {
            const { data } = axios.post("/dar-adopcion/store", formData); 
            reset();
            toast.success("Adopción registrada");
            router.visit('/myadoptions');
        } catch (error) {
            console.log(error)
        }
    }

    const images = watch('imagenes');

    return (
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Información de la mascota</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Completa la información de tu mascota que deseas dar en adopción.
                                </p>
                            </header>
                            <form 
                                className="mt-6 space-y-6"
                                onSubmit={handleSubmit(submitForm)}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <Select
                                        id="tipo"
                                        className="mt-1 block w-full"
                                        label="Selecciona el tipo de tu mascota"
                                        onChange={(e) => setValue('tipo', e.target.value)}
                                        required
                                        autoComplete="tipo"
                                        errors={errors["tipo"]}
                                        disabled={isSubmitting}
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
                                        onChange={(e) => setValue('sexo', e.target.value)}
                                        required
                                        autoComplete="sexo"
                                        errors={errors["sexo"]}
                                        disabled={isSubmitting}
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
                                    setImage={setValue}
                                    images={images}
                                    errors={errors["imagenes"]}
                                    isDisabled={isSubmitting}
                                />

                                <div className="flex items-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="p-2 bg-custom-gold text-white rounded-md"
                                    >Enviar</button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

PostAdoptionForm.layout = (page) => (
    <Authenticated 
        children={page}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dar en adopción</h2>}
    />
);

export default PostAdoptionForm;