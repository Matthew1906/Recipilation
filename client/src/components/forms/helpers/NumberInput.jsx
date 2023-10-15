import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const NumberInput = ({name, control, max, className})=>{
    const { field } = useController({ name, control, 
        rules:{
            min:{
                value:1, 
                message:'Number must be larger than 0'
            },
            max:{
                value: max,
                message:`Number must be lower than or equal to ${max}`
            },
            required:"Must be filled",
            valueAsNumber:"Must be a number"
        }
    }); 
    return (
        <input 
            type='number' 
            value={field.value} 
            onChange={field.onChange} 
            className={`bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base text-black ${className??""}`}
        />    
    );
};

NumberInput.propTypes = {
    name: PropTypes.string, 
    control: PropTypes.object,
    max: PropTypes.number, 
    className: PropTypes.string
}

export default NumberInput;