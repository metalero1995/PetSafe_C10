import PetCard from "@/Components/PetCard";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const AllPetsAvailable = ({ mascotas }) =>
{
    return (
        <>
            <Head title="Mascotas en adopción" />
            
            <div className="p-12 mt-10">
            <p
                className="text-xl font-bold text-gray-700 my-5"
            >Mascotas en adopción</p>
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
};

AllPetsAvailable.layout = page => (
    <Guest
        children={page}
    />
);

export default AllPetsAvailable;