import { useForm } from "react-hook-form";

import Modal from "../Modal";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import Input from "@/Components/Form/Input";
import { LogInWithGoogle } from "../LogInWithGoogle";

import axios from "axios";

import { router } from '@inertiajs/react'

import toast from 'react-hot-toast';

const schema = z.object({
    name: z.string().min(6, { message: 'El nombre debe tener al menos 6 caracteres' }).max(255, { message: "El nombre no puede tener más de 255 caracteres" }),
    email: z.string().email({ message: 'El correo no es válido' }).max(255, { message: "El correo no puede tener más de 255 caracteres" }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export default function RegisterModal({
    open,
    onClose,
    action,
}) {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const onRegister = (data) => {
        axios.post('/register', data)
            .then((response) => {
                reset();
                onClose();
                
                router.reload();
                toast.success("Bienvenido");
            })
            .catch((e) => {
                console.log(e);
                toast.error("Ocurrió un error")
            });
    };

    return (
        <Modal
            title="Registrarse"
            show={open}
            closeable
            onClose={onClose}
        >
            <form 
                onSubmit={handleSubmit(onRegister)}
                className="space-y-6 px-5 py-3"
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
                    id="password"
                    label="Contraseña"
                    required
                    type="password"
                    errors={errors["password"]}
                    disabled={isSubmitting}
                    register={register}
                />

                <button 
                    type="submit"
                    className="w-full h-12 bg-custom-gold text-white text-center font-bold rounded-md disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    Registrarse
                </button>

                <LogInWithGoogle
                    text="Registrarse con Google"
                />
            </form>

            <p 
                className="text-center text-sm text-gray-500 p-2"
            >
                Ya tienes una cuenta? <span 
                    className="cursor-pointer font-bold"
                    onClick={action}
                >Inicia sesión</span>
            </p>
        </Modal>
    );
};