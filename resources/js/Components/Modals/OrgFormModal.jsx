import React from 'react'
import ModalForm from '../ModalForm';
import Input from '@/Components/Form/Input';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


import axios from "axios";

import toast from 'react-hot-toast';
import Map from '../Map';

const schema = z.object({
  nombre_organizacion: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(255, { message: "El nombre no puede exceder 255 caracteres" }),
  latLng: z.object({
    lat: z.number().min(-90).max(90, { message: "La latitud debe estar entre -90 y 90." }),
    lng: z.number().min(-180).max(180, { message: "La longitud debe estar entre -180 y 180." })
  }).optional().refine((data) => data && data.lat !== undefined && data.lng !== undefined, {
    message: "Selecciona el punto en el mapa",
  }),
  telefono: z
    .string()
    .min(1, { message: "El teléfono es obligatorio" })
    .max(20, { message: "El teléfono no puede exceder 20 caracteres" }),
  ubicacion: z
    .string()
    .min(1, { message: "La ubicación es obligatoria" })
    .max(255, { message: "La ubicación no puede exceder 255 caracteres" }),
  email: z.string().email({ message: 'El email no es válido' }),
});

const OrgFormModal = ({ open, onClose }) => {
  const {
    register,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const submitForm = (data) => {
    axios.post("/panel/admin/organizaciones/store", data)
      .then(() => {
        reset();
        onClose();
        toast.success("Organización creada");
      })
      .catch(() => {
        toast.error("Ocurrió un error");
      });
  }

  const primaryAction = () => {
    handleSubmit(submitForm)();
  }

  const secondaryAction = () => {
    reset();
    onClose();
  }

  const latLng = watch("latLng");

  return (
    <ModalForm
      title="Crear organización"
      show={open}
      onClose={onClose}
      closeable={false}
      description="Completa la información de la organización"
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      primaryLabel="Enviar"
      secondaryLabel="Cancelar"
    >
      <form className="space-y-6 px-5 py-2">
        <Input
          id="nombre_organizacion"
          label="Nombre"
          required
          type="text"
          errors={errors["nombre_organizacion"]}
          disabled={isSubmitting}
          register={register}
        />
        <Input
          id="ubicacion"
          label="Ubicación"
          required
          type="text"
          errors={errors["ubicacion"]}
          disabled={isSubmitting}
          register={register}
        />
        <Input
          id="telefono"
          label="Teléfono"
          required
          type="number"
          errors={errors["telefono"]}
          disabled={isSubmitting}
          register={register}
        />
        <Input
          id="email"
          label="Correo"
          required
          type="email"
          errors={errors["email"]}
          disabled={isSubmitting}
          register={register}
        />
        <Map
          label="Selecciona la ubicación en el mapa"
          errors={errors["latLng"]}
          value={latLng}
          setValue={(value) => setValue('latLng', value, { shouldValidate: true })}
        />
      </form>
    </ModalForm>
  );
}

export default OrgFormModal