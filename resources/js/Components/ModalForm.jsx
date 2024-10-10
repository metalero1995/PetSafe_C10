import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ModalForm({ children, 
    title,
    description = null,
    show = false, 
    maxWidth = 'lg', 
    closeable = true, 
    onClose = () => {},
    primaryAction,
    secondaryAction,
    primaryLabel,
    secondaryLabel
  }) {

    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 flex flex-col bg-white rounded-2xl overflow-x-hidden shadow-xl transform transition-all w-full h-auto max-h-[95%] sm:mx-auto ${maxWidthClass}`}
                    >
                        <Dialog.Title
                            className="text-center text-2xl text-custom-brown p-5"
                        >{title}</Dialog.Title>
                        {description && 
                            <Dialog.Description 
                                className="mb-4 px-5 text-sm text-gray-600"
                            >{description}</Dialog.Description>
                        }
                        <div
                            className="flex-1 overflow-y-auto"
                        >{children}</div>
                        <div
                            className="p-5 flex justify-between"                        
                        >
                            <button
                                className="py-2 px-4 text-white font-bold bg-red-600 rounded-md"
                                onClick={secondaryAction}
                            >{secondaryLabel}</button>
                            <button
                                className="py-2 px-4 text-white font-bold bg-green-600 rounded-md"
                                onClick={primaryAction}
                            >{primaryLabel}</button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

