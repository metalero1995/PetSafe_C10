import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone'

export default function Dropzone({ 
    dragText = 'Suelta las imagenes aquí...', 
    inputText = 'Arrastre y suelte algunos archivos aquí o haga clic para seleccionar archivos',
    setImage,
    images = [],
    errors,
    isDisabled = false
})
{

    const onDrop = useCallback((acceptedFiles) => {
        const allImages = [...images, ...acceptedFiles]
        setImage('imagenes', allImages, { shouldValidate: true });
    }, [images]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
        },
        maxFiles: 5,
        maxSize: 5 * 1024 * 1024,
        disabled: images.length < 5 ? false : true || isDisabled,
    });

    const removeImage = useCallback((name) => {
       const newFiles = [...images].filter((file) => file.name !== name);
       setImage('imagenes', newFiles, { shouldValidate: true });
    }, [images])

    return (
        <>
            <div 
                {...getRootProps()}
                className={
                    `${isDragActive && 'border-indigo-500 bg-indigo-50'}
                    w-full flex flex-col gap-4 p-5 border-dashed border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 items-center justify-center cursor-pointer`
                }
            >
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p className='font-medium text-sm text-indigo-700'>{dragText}</p> :
                    <p 
                        className='font-medium text-xs text-gray-600'
                    >
                        {inputText}
                    </p>
                }

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img 
                            src={image?.url || URL.createObjectURL(image)}
                            alt="Uploaded Preview" 
                            className="w-28 h-28 object-cover rounded-lg" 
                        />
                        <button
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation();
                                removeImage(image.name)
                            }}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white p-1 rounded-full text-xs focus:outline-none hover:bg-red-600"
                        >
                        X
                        </button>
                    </div>
                    ))}
                </div>
            </div>
            {errors && <p className="text-sm text-red-500">{errors.message}</p>}
        </>
    );
}