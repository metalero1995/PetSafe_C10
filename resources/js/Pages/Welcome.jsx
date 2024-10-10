import { Link, Head } from '@inertiajs/react';

import LoginModal from '@/Components/Modals/LoginModal';
import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';
import Guest from '@/Layouts/GuestLayout';

const Welcome = ({ auth, mascotas, reportes }) => {

  return (
    <>
      <Head title="Welcome" />
      <div className="bg-white mt-10 md:mt-0">
        <div className="h-screen relative overflow-hidden bg-white">
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Pet - Safe</h1>
                        <p className="mt-4 text-xl text-gray-900">¿Quiénes somos?</p>
                        <p className="mt-4 text-justify text-gray-500">Somos un equipo comprometido del Municipio de Othón P. Blanco, integrado por profesionales apasionados por el bienestar animal y la mejora de nuestra comunidad. Nuestro proyecto, "PetSafe", nace del compromiso de enfrentar el creciente problema del abandono de mascotas en nuestra ciudad y, en un futuro, expandir su impacto en todo el estado de Quintana Roo.</p>
                        <p className="mt-4 text-xl text-gray-900">¿Qué queremos lograr?</p>
                        <p className="mt-4 text-justify text-gray-500">Nuestro objetivo es desarrollar una plataforma integral que ofrezca soluciones efectivas para la gestión, protección y cuidado de los animales en situación de abandono. Queremos crear un sistema que permita a los ciudadanos reportar casos de maltrato y abandono, localizar mascotas perdidas, y promover la adopción responsable. Además, buscamos facilitar las donaciones para apoyar a refugios y organizaciones dedicadas al cuidado animal, proporcionar un directorio actualizado de servicios veterinarios y refugios, e incluir secciones educativas que fomenten el conocimiento sobre el cuidado de mascotas.</p>
                    </div>
                    <div>
                        <div className="mt-10">
                            {/* Decorative image grid */}
                            <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                    <div className="flex items-center space-x-6 lg:space-x-8">
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 hidden sm:block">
                                                <img src="https://images.unsplash.com/photo-1590634561459-a66450c49241?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFzY290YXMlMjBlbiUyMGFkb3BjaW9ufGVufDB8MXwwfHx8MA%3D%3D" alt="" className="h-full w-full object-cover object-center"/>
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg hidden sm:block">
                                                <img src="https://images.unsplash.com/photo-1618436132461-c73c4765e86b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFzY290YXMlMjBlbiUyMGFkb3BjaW9ufGVufDB8MXwwfHx8MA%3D%3D" alt="" className="h-full w-full object-cover object-center"/>
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg hidden sm:block">
                                                <img src="https://images.unsplash.com/photo-1675701917667-d654fa82e536?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFzY290YXMlMjBlbiUyMGFkb3BjaW9ufGVufDB8MXwwfHx8MA%3D%3D" alt="" className="h-full w-full object-cover object-center"/>
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg hidden sm:block">
                                                <img src="https://images.unsplash.com/photo-1675701917466-9a2f2db9d310?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D" alt="" className="h-full w-full object-cover object-center"/>
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg hidden sm:block">
                                                <img src="https://images.unsplash.com/photo-1583786693544-e352f898888d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D" alt="" className="h-full w-full object-cover object-center"/>
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg hidden sm:block">
                                                <img src="https://images.unsplash.com/photo-1675701918017-fda8f5bcbf90?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3Dv" alt="" className="h-full w-full object-cover object-center"/>
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg hidden sm:block">
                                                <img src="https://images.unsplash.com/photo-1542715234-4bafcfc68bd9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8" alt="" className="h-full w-full object-cover object-center"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        {/* Adopciones */}
        <div className="min-h-screen mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Mascotas en adopción agregadas recientemente</h2>

            { mascotas.length == 0 ? <p>No pets found.</p> : 
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {mascotas.forEach((mascota) => (
                        <div className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img src="{{ asset($mascota->imagen) }}" alt="No imagen" className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                            <div className="mt-4 flex justify-between items-start">
                                <h3 className="text-sm text-gray-700">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                        {mascota.tipo}
                                    </a>
                                </h3>
                                <p className="text-sm font-medium text-gray-900">
                                    Publicado el: { /*mascota.created_at.format('d/m/Y')*/ }
                                </p>
                            </div>
                            <p className="text-sm font-medium text-gray-900 mt-2">{mascota.descripcion}</p>
                        </div>)
                        )
                    }
                </div>
            }
            <footer className="mt-12 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre la Adopción</h3>
                <p className="text-sm text-gray-700 mb-2">
                    La adopción de mascotas no solo brinda un hogar a los animales que lo necesitan, sino que también ayuda a mejorar la salud y el bienestar de nuestra comunidad. Al adoptar, le das a una mascota una segunda oportunidad para vivir una vida plena y feliz. Además, al adoptar en lugar de comprar, estás apoyando la reducción de la sobrepoblación animal y contribuyendo a disminuir la cantidad de animales sin hogar.
                </p>
                <p className="text-sm text-gray-700">
                    Las adopciones también tienen un impacto positivo en la población humana. Las mascotas pueden proporcionar compañía, reducir el estrés y mejorar el estado de ánimo. Al elegir adoptar, estás haciendo una diferencia significativa tanto en la vida de los animales como en la tuya propia. Gracias por considerar la adopción y por apoyar a los animales que necesitan un hogar.
                </p>
            </footer>
        </div>

        {/*Reporte de mascotas*/}
        <div className="min-h-screen mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Reportes recientes de mascotas</h2>

            {reportes.length == 0 ? <p>No pets found.</p> : 
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {reportes.forEach((mascota) => (
                    <div className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img src="{{ Storage::url($mascota->foto_mascota) }}" alt="No imagen" className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                        </div>
                        <div className="mt-4 flex justify-between items-start">
                            <h3 className="text-sm text-gray-700">
                                <a href="#">
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    {mascota.tipo_mascota}
                                </a>
                            </h3>
                            <p className="text-sm font-medium text-gray-900">
                                Publicado el: { /*mascota.created_at.format('d/m/Y') */}
                            </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mt-2">{ mascota.descripcion }</p>
                    </div>
                ))
                }
            </div>
            }
            <footer className="mt-12 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reportes de Extravíos y Maltrato</h3>
                <p className="text-sm text-gray-700 mb-2">
                    Si encuentras un animal perdido o en situación de calle, es crucial que lo reportes para que pueda recibir la ayuda que necesita. Los reportes permiten a las organizaciones de rescate y a las autoridades tomar medidas para brindar asistencia a estos animales y, en muchos casos, ayudarles a encontrar un hogar seguro.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                    Además, es importante reportar cualquier caso de maltrato animal. La denuncia de abuso o negligencia ayuda a proteger a los animales de condiciones inhumanas y a garantizar que reciban el cuidado adecuado. Puedes contactar a organizaciones locales de protección animal o a las autoridades competentes para hacer estos reportes.
                </p>
                <p className="text-sm text-gray-700">
                    Tu participación activa es fundamental para mejorar la vida de los animales en nuestra comunidad. Gracias por ser un defensor de su bienestar y por ayudar a asegurar que todos los animales reciban la atención y el respeto que merecen.
                </p>
            </footer>
        </div>

        {/* Organizaciones*/}
        {/*<div className="h-screen mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Organizaciones agregadas recientemente</h2>

            @if($mascotas->isEmpty())
            <p>No pets found.</p>
            @else
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                @foreach($mascotas as $mascota)
                <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img src="{{ asset($mascota->imagen) }}" alt="No imagen" className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                    </div>
                    <div className="mt-4 flex justify-between items-start">
                        <h3 className="text-sm text-gray-700">
                            <a href="#">
                                <span aria-hidden="true" className="absolute inset-0"></span>
                                {mascota.tipo}
                            </a>
                        </h3>
                        <p className="text-sm font-medium text-gray-900">
                            Publicado el: { mascota.created_at.format('d/m/Y')}
                        </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mt-2">{mascota.descripcion}</p>
                </div>
                @endforeach
            </div>
            @endif
            <footer className="mt-12 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Importancia de las Organizaciones para Mascotas</h3>
                <p className="text-sm text-gray-700 mb-2">
                    Las organizaciones dedicadas al cuidado y bienestar de los animales desempeñan un papel fundamental en nuestras comunidades. Desde tiendas especializadas en artículos para mascotas hasta veterinarias, refugios y otras instituciones, estos recursos proporcionan apoyo esencial para garantizar que nuestras mascotas reciban la mejor atención posible.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                    En nuestro sistema web, hemos integrado una variedad de organizaciones que pueden ayudarte a cuidar de tus mascotas. Encontrarás tiendas con productos de calidad, clínicas veterinarias para el cuidado de la salud de tus animales, y refugios que ofrecen servicios de adopción y cuidado para aquellos que necesitan un hogar.
                </p>
                <p className="text-sm text-gray-700">
                    Conocer y utilizar estos recursos es clave para proporcionar a tus mascotas un entorno saludable y feliz. Asegúrate de explorar todas las opciones disponibles en nuestra plataforma para encontrar el apoyo y los servicios que mejor se adapten a tus necesidades y las de tus mascotas.
                </p>
            </footer>
        </div>
        */}
    </div>
    </>
  )
}

Welcome.layout = (page) => (
    <Guest
        children={page}
    />
);

export default Welcome;