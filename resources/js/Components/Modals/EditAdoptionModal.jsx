import Select from "@/Components/Select";
import Dropzone from "@/Components/Dropzone";
import Input from "@/Components/Form/Input";
import TextArea from "@/Components/Form/TextArea";

import Modal from "../Modal";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


import axios from "axios";

import { toast } from "react-toastify";
import { useEffect } from "react";

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
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const submitForm = async (data) => {
        
    }

    const images = watch('imagenes');

    useEffect(() => {
        console.log(adoption);
        if(adoption) {
            setValue('imagenes', adoption?.imagenes)
        }
    }, [adoption]);

    return (
        <Modal 
            title="Editar información de adopción"
            show={open}
            closeable
            onClose={onClose}
        >
            <form className="space-y-6 px-5">
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
            </form>
        </Modal>
    );
};