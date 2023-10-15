import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { titleString } from "../../../utils/string";

const TextInput = ({ type, control, name, placeholder, className, isSearch=false, minLength=5, maxLength=30 }) => {
  const rules = {
    required:`${titleString(name)} must be filled`,
    minLength:{value:minLength, message:`Length must be at least ${minLength} letters`},
    maxLength:{value:maxLength, message:`Length must be less than or equal to ${maxLength} letters`},
  }
  const { field } = useController({name, control, rules:isSearch?{}:rules}); 
  return (
    <input 
      type={type || 'text'} 
      value={field.value}
      onChange={field.onChange} 
      placeholder={placeholder ?? ""}
      className={`bg-white-primary border-red border rounded-md px-3 py-2 text-xs sm:text-sm md:text-base ${className ?? ""}`}
      autoComplete='on'
    />
  );
};

TextInput.propTypes = {
  type: PropTypes.string, 
  control: PropTypes.object, 
  name: PropTypes.string, 
  placeholder: PropTypes.string, 
  className: PropTypes.string, 
  isSearch: PropTypes.bool, 
  minLength: PropTypes.number, 
  maxLength: PropTypes.number
}

export default TextInput;