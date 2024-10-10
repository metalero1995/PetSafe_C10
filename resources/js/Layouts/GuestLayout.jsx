import { useState, useEffect } from 'react';
import { useRemember } from '@inertiajs/react'

import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

import LoginModal from '@/Components/Modals/LoginModal';
import RegisterModal from '@/Components/Modals/RegisterModal';

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdoptionFormModal from '@/Components/Modals/AdoptionFormModal';

export default function Guest({ children }) {
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    const [adopcionModal, setAdopcionModal] = useRemember(false)

    const { auth  } = usePage().props;

    useEffect(() => {
        const handleAuthSuccess = (event) => {
            if (event.origin === window.location.origin && event.data === 'auth-success') {
                router.reload();
                toast.success("Bienvenido");
                setRegisterModal(false);
                setLoginModal(false);
            }
        };

        window.addEventListener('message', handleAuthSuccess);

        return () => {
            window.removeEventListener('message', handleAuthSuccess);
        };
    }, []);

    useEffect(() => {
        if(adopcionModal === true) {
            if(!auth?.user) {
                setLoginModal(true);
            }
        }
    }, [adopcionModal])

    return (
        <>
            <ToastContainer/>
            <AdoptionFormModal
                open={adopcionModal && auth?.user ? true : false}
                onClose={() => setAdopcionModal(false)}
            />
            <RegisterModal
                open={registerModal}
                onClose={() => setRegisterModal(false)}
                action={() => {
                    setRegisterModal(false);
                    setLoginModal(true);
                }}
            />
            <LoginModal 
                open={loginModal} 
                onClose={() => setLoginModal(false)}
                action={() => {
                    setLoginModal(false);
                    setRegisterModal(true);
                }}
            />
            <div className="fixed flex justify-between items-center top-0 right-0 px-6 py-2 text-right z-10 bg-white w-full">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                </Link>
                <Link href="/mascotas" className="ml-4 font-semibold text-custom-beige hover:text-gray-900 dark:text-custom-beige dark:hover:text-gray-600 focus:outline focus:outline-2 focus:rounded-sm">Mascotas</Link>
                <a href="" className="ml-4 font-semibold text-custom-beige hover:text-gray-900 dark:text-custom-beige dark:hover:text-gray-600 focus:outline focus:outline-2 focus:rounded-sm">Organizaciones</a>
                <a href="" className="ml-4 font-semibold text-custom-beige hover:text-gray-900 dark:text-custom-beige dark:hover:text-gray-600 focus:outline focus:outline-2 focus:rounded-sm">Contacto</a>
                
                <button 
                    type="button"
                    className="hidden md:block font-bold text-gray-700 border border-gray-400 p-2 rounded-full"
                    onClick={() => setAdopcionModal(true)}
                >Dar en adopción</button>
                <button 
                    type="button"
                    className="hidden md:block font-bold text-gray-700 border border-gray-400 p-2 rounded-full"
                    onClick={() => {}}
                >Reportar extravío</button>
                <div className="hidden md:block">
                    <Dropdown>
                        <Dropdown.Trigger>
                            {!auth?.user ? (
                                <img
                                    src='/imagenes/blank_profile.png'
                                    alt='profile image'
                                    className='rounded-full w-10 h-10 cursor-pointer'
                                />
                            ) : (
                                auth?.user?.photo ? (
                                    <img
                                        src={auth?.user?.photo}
                                        alt='profile image'
                                        className='rounded-full w-10 h-10 cursor-pointer'
                                    />
                                ) : (
                                    <div 
                                        className='bg-blue-500 text-white font-bold flex justify-center items-center rounded-full w-10 h-10 cursor-pointer'
                                    >{auth?.user?.name?.charAt(0)}</div>
                                )
                            )}

                            {/*<span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    {auth?.user?.name}

                                    <svg
                                        className="ms-2 -me-0.5 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>*/}
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            {auth?.user ? (
                                <>
                                    <Dropdown.Link 
                                        href={route('profile.edit')}
                                    >Perfil</Dropdown.Link>
                                    <Dropdown.Link 
                                        href={route('logout')} 
                                        method="post" 
                                        as="button"
                                    >
                                        Cerrar sesión
                                    </Dropdown.Link>

                                    <Dropdown.Link 
                                        href="/myadoptions"
                                    >Mis mascotas</Dropdown.Link>
                                </>
                            ) : (
                                <>
                                    <button 
                                        type='button'
                                        className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'
                                        onClick={() => setLoginModal(true)}
                                    >Iniciar sesión</button>
                                    <button
                                        type='button'
                                        className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'
                                        onClick={() => setRegisterModal(true)}
                                    >
                                        Registrarse
                                    </button>
                                </>
                            )}

                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
            {children}
            <div className="block md:hidden fixed bottom-0 w-full bg-white shadow-md">
                <div className="flex justify-around py-4">
                    <div 
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => setAdopcionModal(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-7 6a4 4 0 00-8 0v7h16v-7a4 4 0 00-8 0z" />
                        </svg>
                        <span className="text-xs text-gray-700">Dar en adopción</span>
                    </div>
                    <div 
                        className="flex flex-col items-center cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-gray-700">Reportar extravío</span>
                    </div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            {!auth?.user ? (
                                <img
                                    src='/imagenes/blank_profile.png'
                                    alt='profile image'
                                    className='rounded-full w-10 h-10 cursor-pointer'
                                />
                            ) : (
                                auth?.user?.photo ? (
                                    <img
                                        src={auth?.user?.photo}
                                        alt='profile image'
                                        className='rounded-full w-10 h-10 cursor-pointer'
                                    />
                                ) : (
                                    <div 
                                        className='bg-blue-500 text-white font-bold flex justify-center items-center rounded-full w-10 h-10 cursor-pointer'
                                    >{auth?.user?.name?.charAt(0)}</div>
                                )
                            )}

                            {/*<span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    {auth?.user?.name}

                                    <svg
                                        className="ms-2 -me-0.5 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>*/}
                        </Dropdown.Trigger>

                        <Dropdown.Content
                            position="buttom"
                        >
                            {auth?.user ? (
                                <>
                                    <Dropdown.Link 
                                        href={route('profile.edit')}
                                    >Perfil</Dropdown.Link>
                                    <Dropdown.Link 
                                        href={route('logout')} 
                                        method="post" 
                                        as="button"
                                    >
                                        Cerrar sesión
                                    </Dropdown.Link>
                                    <Dropdown.Link 
                                        href="/myadoptions"
                                    >Mis mascotas</Dropdown.Link>
                                </>
                            ) : (
                                <>
                                    <button 
                                        type='button'
                                        className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'
                                        onClick={() => setLoginModal(true)}
                                    >Iniciar sesión</button>
                                    <button
                                        type='button'
                                        className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'
                                        onClick={() => setRegisterModal(true)}
                                    >
                                        Registrarse
                                    </button>
                                </>
                            )}

                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

        </>
    );
}
