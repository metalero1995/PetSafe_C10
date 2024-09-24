import PetCard from "@/Components/PetCard";
import { Head, Link } from "@inertiajs/react";

const AllPetsAvailable = ({ auth, mascotas }) =>
{
    console.log(mascotas);

    return (
        <>
            <Head title="Mascotas en adopción" />

            {route().has('login') && (
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10 bg-custom-gold w-full">
                    {auth?.user ? (
                        <a href="" className="font-semibold text-custom-beige hover:text-gray-900 dark:text-custom-lightBeige dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Inicio</a>
                    ) : (
                        <>
                        <Link href="/login" className="font-semibold text-custom-lightBeige hover:text-gray-900 dark:text-custom-lightBeige dark:hover:text-gray-600 focus:outline focus:outline-2 focus:rounded-sm">Iniciar sesión</Link>
                        <Link href="/register" className="ml-4 font-semibold text-custom-lightBeige hover:text-gray-900 dark:text-custom-lightBeige dark:hover:text-gray-600 focus:outline focus:outline-2 focus:rounded-sm">Registrarse</Link>
                        </>
                    )
                    }
                    <Link href="/mascotas" className="ml-4 font-semibold text-custom-lightBeige hover:text-gray-900 dark:text-custom-lightBeige dark:hover:text-gray-600 focus:outline focus:outline-2 focus:rounded-sm">Adopciones</Link>
                    <a href="" className="ml-4 font-semibold text-custom-lightBeige hover:text-gray-900 dark:text-custom-lightBeige dark:hover:text-gray-600 focus:outline focus:outline-2 focus:rounded-sm">Dar en adopción</a>
                    <a href="" className="ml-4 font-semibold text-custom-lightBeige hover:text-gray-900 dark:text-custom-lightBeige dark:hover:text-gray-600 focus:outline focus:outline-2 focus:rounded-sm">Contacto</a>
                    <a href="" className="ml-4 font-semibold text-custom-lightBeige hover:text-gray-900 dark:text-custom-lightBeige dark:hover:text-gray-600 focus:outline focus:outline-2 focus:rounded-sm">Organizaciones</a>
                </div>
            )}
            
            <div className="p-12 mt-10">
                <div className="w-full h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    {mascotas.map((mascota) => (
                        <PetCard
                            key={mascota.id}
                            mascota={mascota}
                            type="public"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default AllPetsAvailable;