import { useState } from "react";
import { ImageInput, InputLabel, TextArea, TextInput } from "./helpers";
import { useImage } from "../../hooks";
import { Button } from "../utils";

const StepForm = ({index, onSubmit})=>{
    const { image, setImage, getRootProps, getInputProps } = useImage();
    const [step, setStep] = useState({});
    const setTitle = (e)=>setStep(prevInput=>({...prevInput, title:e.target.value}));
    const setDescription = (e)=>setStep(prevInput=>({...prevInput, description:e.target.value}));
    const submit = (e)=>{
        e.preventDefault();
        onSubmit({...step, image});
        setImage(null);
    }
    return (
    <form className="px-5 py-4 border border-red rounded-md" onSubmit={submit}>
        <h5 className="text-center text-xl font-fjalla-one mb-2">{`EDIT STEP ${index}`}</h5>
        <InputLabel className="mb-3" required>Step Title</InputLabel>
        <TextInput onChange={setTitle} value={step.title || ""} className="w-full text-black"/>
        <InputLabel className="my-3" required>Step Description</InputLabel>
        <TextArea rows={4} value={step.description || ""} onChange={setDescription}/>
        <InputLabel className="my-3">Step Image</InputLabel>
        <ImageInput image={image} rootProps={getRootProps} inputProps={getInputProps} p={10}/>
        <div className="mt-4 flex justify-between">
            <Button theme="red" className="text-xl px-12">Cancel</Button>
            <Button theme="orange" className="text-xl px-12">Save</Button>
        </div>
    </form>
    )
}

export default StepForm;