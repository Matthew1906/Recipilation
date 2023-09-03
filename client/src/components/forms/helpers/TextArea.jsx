import { useController } from "react-hook-form";
import { titleString } from "../../../utils/string";

const TextArea = ({rows, control, name, placeholder, className})=>{
    const { field } = useController({name, control, rules:{
        required:`${titleString(name)} must be filled`,
        minLength:{value:5, message:"Length must be at least 5 letters"},
        maxLength:{value:5000, message:"Length must be less than or equal to 5000 letters"},
    }}); 
    return (
        <textarea 
            rows={rows} 
            value={field.value}
            onChange={field.onChange} 
            placeholder={placeholder ?? ""}
            className={`p-4 w-full border-red rounded-lg bg-white-primary ${className??""}`}
        />
    )
};

export default TextArea;