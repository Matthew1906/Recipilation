import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ImageInput, InputLabel, TextArea, TextInput } from "./helpers";
import { useImage } from "../../hooks";
import { Button } from "../utils";
import { useEffect } from "react";

const StepForm = ({index, onSubmit, isUpdate})=>{
    const { control, setValue, handleSubmit, formState:{errors, submitCount}, reset } = useForm({defaultValues:{
        title:'', details:''
    }});
    const { image, setImage, getRootProps, getInputProps, imageError } = useImage();
    useEffect(()=>{
        if(isUpdate){
            setValue('title', isUpdate.title);
            setValue('details', isUpdate.details);
            setImage({preview:isUpdate.image})
        }
    }, [isUpdate, setValue, setImage]);
    const submit = (data)=>{
        onSubmit({...data, image:image?.preview??null});
        reset();
        setImage(null);        
    }
    return (
        <form className="px-5 py-4 border border-red rounded-md" onSubmit={handleSubmit(submit)}>
            <h5 className="text-center text-xl font-fjalla-one mb-2">{`${isUpdate?'EDIT':'ADD'} STEP ${index}`}</h5>
            <InputLabel className="mb-3" required>Step Title</InputLabel>
            <TextInput name="title" control={control} className="w-full text-black" maxLength={100}/>
            <ErrorMessage errors={errors} name="title" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
            <InputLabel className="my-3" required>Step Description</InputLabel>
            <TextArea rows={4} name="details" control={control}/>
            <ErrorMessage errors={errors} name="details" render={({ message }) => <p className="mt-1 text-xs text-left text-red">{message}</p>}/>
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