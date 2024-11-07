import Guest from '@/Layouts/GuestLayout'
import Input from '@/Components/Form/Input';

import { Head } from '@inertiajs/react';

import { useForm } from "react-hook-form";

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import TextArea from '@/Components/Form/TextArea';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(1, { message: 'El nombre es obligatorio' }).max(255, { message: 'El nombre no puede tener más de 255 caracteres' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }).max(255, { message: 'El correo electrónico no puede tener más de 255 caracteres' }),
  telefono: z.string().min(1, { message: 'El teléfono es obligatorio' }).max(255, { message: 'El teléfono no puede tener más de 255 caracteres' }),
  subject: z.string().min(1, { message: 'El asunto es obligatorio' }).max(255, { message: 'El asunto no puede tener más de 255 caracteres' }),
  message: z.string().min(1, { message: 'El mensaje es obligatorio' }),
});

const Contact = () => {
  const [mensaje, setMensaje] = useState("");

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
      mode: "onChange",
      resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    axios.post("/contactanos", data)
      .then((response) => {
        //toast.success(response?.data?.mensaje);
        reset();
        setMensaje(response?.data?.mensaje);
      })
      .catch((e) => {
        //console.log(e);
        reset();
        setMensaje("Ocurrió un error");
      });
  }

  return (
    <>
      <Head
        title="Contactanos"
      />

      <div className="p-12 mt-10">
        <h1
          className="text-3xl font-bold text-gray-700 my-5"
        >
          Contactanos
        </h1>
        {
          mensaje ? <p id='msj'>{mensaje}</p> : null
        }
        <form 
          className="space-y-6 py-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="name"
            label="Nombre"
            required
            type="text"
            errors={errors["name"]}
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
          <Input
            id="telefono"
            label="Teléfono"
            required
            type="text"
            errors={errors["telefono"]}
            disabled={isSubmitting}
            register={register}
          />
          <Input
            id="subject"
            label="Asunto"
            required
            type="text"
            errors={errors["subject"]}
            disabled={isSubmitting}
            register={register}
          />
          <TextArea
            id="message"
            label="Mensaje"
            required
            type="text"
            errors={errors["message"]}
            disabled={isSubmitting}
            register={register}
          />

          <button 
            type="submit"
            id="buttonForm"
            className="w-full h-12 bg-custom-gold text-white text-center font-bold rounded-md"
            disabled={isSubmitting}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}

Contact.layout = page => (
  <Guest
    children={page}
  />
);
 
export default Contact