import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ImageInput, InputLabel, TextInput } from "./helpers";
import { Button } from "../utils";
import { useImage } from "../../hooks";
import { base64String } from "../../utils/string";

const EquipmentForm = ({onSubmit})=>{
    const { control, handleSubmit, formState:{errors, submitCount} } = useForm({defaultValues:{name:''}});
    const { image, getRootProps, getInputProps, imageError } = useImage();
    const submit = (data)=>{
        if(image!==null){
            fetch(image.preview).then(r => {
                r.blob().then(res=>base64String(res).then(res=>{
                    onSubmit({...data, image:res});
                }))
            });
        }
        else{
            onSubmit({...data, image});
        }
    }
    return (
        <form className="mt-4 px-5 py-4 border border-red rounded-md" onSubmit={handleSubmit(submit)}>
            <InputLabel className="mb-3" required>Equipment Name</InputLabel>
            <TextInput name="name" control={control} className="w-full text-black"/>
            <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
            <InputLabel className="my-3">Equipment Image</InputLabel>
            <ImageInput image={image} rootProps={getRootProps} inputProps={getInputProps} p={10}/>
            {submitCount>0 && imageError && <p className="mt-2 text-xs text-left text-red">Must insert image</p>}
            <div className="mt-4 flex justify-end">
                <Button theme="green" className="text-xl px-12">ADD</Button>
            </div>
        </form>
    );
}

EquipmentForm.propTypes = {
    onSubmit: PropTypes.func
}

export default EquipmentForm;