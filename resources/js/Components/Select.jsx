
export default function Select({ options = [], label, className = '', id, errors, ...props })
{
    return (
        <div>
            <label
                className="block font-medium text-sm text-gray-700"
                htmlFor={id}
            >{label}</label>
            <select
                id={id}
                className={
                    'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                    className
                }
                {...props}
            >
                {options.map((i) => (
                    <option 
                        key={i.id}
                        value={i.id}>
                    {i.nombre}</option>
                ))}
            </select>
            {errors && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>
    );
}