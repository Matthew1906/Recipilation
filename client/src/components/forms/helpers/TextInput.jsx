const TextInput = ({ type, value, onChange, placeholder, className }) => {
  return (
    <input 
        type={type || 'text'} 
        value={value}
        onChange={onChange} 
        placeholder={placeholder || ""}
        className={`bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base ${className || ""}`}
    />
  );
};

// grow text-red placeholder:text-red
// w-full text-black

export default TextInput;