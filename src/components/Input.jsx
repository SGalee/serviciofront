export default function Input({
  label,
  id,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  error = false,
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full px-2 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-shadow
          ${error
            ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
            : 'border-amber-200 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300'}`}
      />
    </div>
  );
}
