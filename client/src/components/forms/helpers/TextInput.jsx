import { useController } from "react-hook-form";
import { titleString } from "../../../utils/string";

const TextInput = ({ type, control, name, placeholder, className, minLength=5, maxLength=30 }) => {
  const { field } = useController({name, control, rules:{
    required:`${titleString(name)} must be filled`,
    minLength:{value:minLength, message:`Length must be at least ${minLength} letters`},
    maxLength:{value:maxLength, message:`Length must be less than or equal to ${maxLength} letters`},
  }}); 
  return (
    <input 
      type={type || 'text'} 
      value={field.value}
      onChange={field.onChange} 
      placeholder={placeholder ?? ""}
      className={`bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base ${className ?? ""}`}
      autoComplete='on'
    />
  );
};

export default TextInput;