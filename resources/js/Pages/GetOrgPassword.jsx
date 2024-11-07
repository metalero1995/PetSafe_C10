import { Head, Link } from '@inertiajs/react';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import axios from "axios";

import { router } from '@inertiajs/react'

import toast from 'react-hot-toast';

import Input from "@/Components/Form/Input";

const schema = z.object({
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

const GetOrgPassword = ({ token }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    axios.post("/createpassword", { ...data, token })
      .then(() => {
        reset();
        router.visit("/dashboard");
      })
      .catch(() => {
        toast.error("Ocurrió un error");
      });
  }

  return (
    <>
      <Head
        title={token ? "Crear contraseña" : "Error"}
      />
      <div className="w-full h-screen flex justify-center items-center bg-slate-200">
        {token ? (
          <div
            className="p-5 rounded-md shadow-md min-w-[50%] max-w-xl bg-white"
          >
            <h1
              className="text-center text-2xl text-custom-brown p-5"
            >Crear contraseña</h1>
            <p></p>
            <form
              className="space-y-6 px-5 py-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                id="password"
                label="Contraseña"
                required
                type="password"
                errors={errors["password"]}
                disabled={isSubmitting}
                register={register}
              />
              <Input
                id="confirmPassword"
                label="Confirmar Contraseña"
                required
                type="password"
                errors={errors["confirmPassword"]}
                disabled={isSubmitting}
                register={register}
              />

              <button 
                type="submit"
                className="w-full h-12 bg-custom-gold text-white text-center font-bold rounded-md"
                disabled={isSubmitting}
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        ) : (
          <div
            className="p-5 rounded-md shadow-md min-w-[50%] max-w-xl bg-white flex flex-col gap-2 justify-center items-center"
          >
            <p
              className="text-red-500 font-bold text-xl"
            >Ocurrió un error</p>
            <Link
              className="p-2 rounded-md text-white bg-custom-gold"
              href="/"
            >Ir a inicio</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default GetOrgPassword;