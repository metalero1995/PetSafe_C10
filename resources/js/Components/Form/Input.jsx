
export default function Input({
    label,
    id,
    required,
    type,
    register,
    errors,
    ...props
})
{

    return (
        <div>
            <label
                className="block font-medium text-sm text-gray-700"
                htmlFor={id}
            >{label}</label>
            <input
                id={id}
                type={type}
                {...register(id, { required })}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                {...props}
            />
            {errors && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>
    )
}