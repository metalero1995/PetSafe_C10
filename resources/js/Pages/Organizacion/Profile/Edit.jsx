import OrgLayout from '@/Layouts/OrgLayout';
import { Head } from '@inertiajs/react';

import Input from '@/Components/Form/Input';
import Map from '@/Components/Map';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextArea from '@/Components/Form/TextArea';
import UpdateProfileImage from './Partials/UpdateProfileImage';

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
  descripcion: z
    .string()
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    .max(280, { message: 'La descripción no puede tener más de 280 caracteres' })
    .optional()
    .or(z.literal('')),
});

const Edit = ({ org }) => {

  console.log(org);

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
    defaultValues: {
      nombre_organizacion: org.nombre_organizacion,
      ubicacion: org.ubicacion,
      telefono: org.telefono,
      latLng: {
        lat: org.latitud,
        lng: org.longitud
      },
      descripcion: org.descripcion,
    }
  });

  const latLng = watch("latLng");

  return (
    <>
      <Head
        title="Perfil"
      />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <section
              className="max-w-xl"
            >
              <header>
                <h2 className="text-lg font-medium text-gray-900">Información de la organización</h2>

                <p className="mt-1 text-sm text-gray-600">
                  Actualiza la información de la organización
                </p>
              </header>

              <form
                className="mt-6 space-y-6"
              >
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
                <TextArea
                  id="descripcion"
                  label="Descripción"
                  required
                  type="text"
                  errors={errors["descripcion"]}
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

            </section>
          </div>
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdateProfileImage
              coverImage={org.cover_photo}
              profileImage={org.photo}
            />
          </div>
        </div>
    </div>
    </>
  );
};

Edit.layout = page => (
  <OrgLayout
    children={page}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Perfil</h2>}
  />
)

export default Edit;