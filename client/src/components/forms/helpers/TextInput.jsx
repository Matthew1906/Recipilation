import { useController } from "react-hook-form";
import { titleString } from "../../../utils/string";

const TextInput = ({ type, control, name, placeholder, className }) => {
  const { field } = useController({name, control, rules:{
    required:`${titleString(name)} must be filled`,
    minLength:{value:5, message:"Length must be at least 5 letters"},
    maxLength:{value:30, message:"Length must be less than or equal to 30 letters"},
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