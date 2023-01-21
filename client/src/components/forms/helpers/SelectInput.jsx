import { useController } from "react-hook-form";

const SelectInput = ({name, control, options, className})=>{
    const { field } = useController({name, control, rules:{required:true}}); 
    return(
        <select onChange={field.onChange} value={field.value} 
            className={`bg-white-primary border-red border rounded-md px-3 py-2 text-black text-sm md:text-base ${className}`}
        >
            {options.map((option, key)=>(
                <option key={key} value={option.value}>{option.name}</option>
            ))}
        </select>
    );
}

export default SelectInput;