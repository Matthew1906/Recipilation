import { useController } from "react-hook-form";

const TextInput = ({ type, control, name, placeholder, className }) => {
  const { field, fieldState:{error} } = useController({name, control, rules:{required:true}}); 
  return (
    <input 
      type={type || 'text'} 
      value={field.value}
      onChange={field.onChange} 
      placeholder={placeholder || ""}
      className={`bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base ${className || ""}`}
      autoComplete='on'
    />
  );
};

export default TextInput;