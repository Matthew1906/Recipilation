import moment from "moment";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { titleString } from "../../../utils/string";

const DateInput = ({ control, name, className}) => {
  const { field } = useController({name, control, rules:{
    required:`${titleString(name)} must be filled`
  }}); 
  return (
    <input 
      type='date' 
      value={moment(field.value).format('YYYY-MM-DD')}
      onChange={field.onChange} 
      className={`bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base ${className ?? ""}`}
    />
  );
};

DateInput.propTypes = {
  control: PropTypes.object, 
  name: PropTypes.string, 
  className: PropTypes.string
}

export default DateInput;