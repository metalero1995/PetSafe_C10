import Select from "@/Components/Select";
import Dropzone from "@/Components/Dropzone";
import Input from "@/Components/Form/Input";
import TextArea from "@/Components/Form/TextArea";

import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


import axios from "axios";

import toast from 'react-hot-toast';

import ModalForm from "../ModalForm";

import Map from "../Map";

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

export default function ReporteFormModal({ open, onClose }) {

    const { url } = usePage();

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
            const { data } = await axios.post("/dar-adopcion/store", formData); 
            reset();
            toast.success("Adopción registrada");
            onClose();
            if(url !== "/myadoptions") {
                router.visit('/myadoptions');
            } else {
                router.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const images = watch('imagenes');

    const secondaryAction = () => {
        reset();
        onClose();
        console.log("hola")
    }

    const primaryAction = () => {
        handleSubmit(submitForm)();
    }

    return (
        <ModalForm
            title="Reportar extravío"
            show={open}
            onClose={onClose}
            closeable={false}
            description="Completa la información de la mascota"
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            primaryLabel="Enviar"
            secondaryLabel="Cancelar"
        >
            <form
                className="px-5"
            >
                <div className="space-y-6 overflow-y-auto">
                    <Select
                        id="tipo"
                        className="mt-1 block w-full"
                        label="Tipo de mascota"
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
                        inputText="Presiona o arrastra imagenes de tu mascota (máximo 5 imágenes)"
                    />
                </div>
            </form>
        </ModalForm>
    )
}