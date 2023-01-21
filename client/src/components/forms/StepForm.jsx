import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ImageInput, InputLabel, TextArea, TextInput } from "./helpers";
import { useImage } from "../../hooks";
import { Button } from "../utils";

const StepForm = ({index, onSubmit})=>{
    const { control, handleSubmit, formState:{errors, submitCount} } = useForm({defaultValues:{title:'', description:''}});
    const { image, setImage, getRootProps, getInputProps, imageError } = useImage();
    const submit = (data)=>{
        onSubmit({...data, image});
        setImage(null);
    }
    return (
        <form className="px-5 py-4 border border-red rounded-md" onSubmit={handleSubmit(submit)}>
            <h5 className="text-center text-xl font-fjalla-one mb-2">{`EDIT STEP ${index}`}</h5>
            <InputLabel className="mb-3" required>Step Title</InputLabel>
            <TextInput name="title" control={control} className="w-full text-black"/>
            <ErrorMessage errors={errors} name="title" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
            <InputLabel className="my-3" required>Step Description</InputLabel>
            <TextArea rows={4} name="description" control={control}/>
            <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="mt-1 text-xs text-left text-red">{message}</p>}/>
            <InputLabel className="my-3">Step Image</InputLabel>
            <ImageInput image={image} rootProps={getRootProps} inputProps={getInputProps} p={10}/>
            {submitCount>0 && imageError && <p className="mt-2 text-xs text-left text-red">Must insert image</p>}
            <div className="mt-4 flex justify-between">
                <Button theme="red" className="text-xl px-12">Cancel</Button>
                <Button theme="orange" className="text-xl px-12">Save</Button>
            </div>
        </form>
    );
}

export default StepForm;