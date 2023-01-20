import { useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const NumberInput = ({name, control, className})=>{
    const { field, fieldState:{error} } = useController({name, control, rules:{min:0}}); 
    return (
        <input 
            type='number' 
            value={field.value} 
            onChange={field.onChange} 
            className={`bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base text-black ${className}`}
        />
    
    );
};

export default NumberInput;