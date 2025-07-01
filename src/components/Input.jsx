export default function Input({ name, value, onChange, placeholder, className }) {
  return (
    <input
      type="text"
      name={name} 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-3 py-2 rounded ${className}`}
    />
  );
}
