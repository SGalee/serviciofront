export default function Input({
  label,
  id,
  nombre = 'text',
  apellido = 'text',
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-2 border border-amber-200 rounded-lg shadow-sm bg-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300
                   transition-colors"
      />
    </div>
  );
}
