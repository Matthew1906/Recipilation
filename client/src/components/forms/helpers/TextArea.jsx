import { useController } from "react-hook-form";

const TextArea = ({rows, control, name, placeholder, className})=>{
    const { field, fieldState:{error} } = useController({name, control, rules:{required:true}}); 
    return (
        <textarea 
            rows={rows} 
            value={field.value}
            onChange={field.onChange} 
            placeholder={placeholder || ""}
            className={`p-4 w-full border-red rounded-lg bg-white-primary ${className || ""}`}
        />
    )
};

export default TextArea;