import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const Checkbox = ({name, label, control, required=false})=>{
    const { field } = useController({name, control, rules:{required:{value:required, message:"Must be checked"}}}); 
    return <div className="flex items-center text-sm md:text-base">
        <input type="checkbox" name={field.name} className="ring-0 ring-red focus:ring-0 rounded border-red border text-red" onChange={field.onChange} checked={field.value}/>
        <label htmlFor={field.name} className='text-red font-semibold ml-2'>{label}</label>
    </div>
}

Checkbox.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    control: PropTypes.object,
    required: PropTypes.bool
}

export default Checkbox;