import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "../utils";

const StepForm = ({index, onSubmit})=>{
    const [image, setImage] = useState(null);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        maxFiles:1,
        onDrop: (acceptedFiles) => {
            setImage(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))[0]);
        }
    });
    const [step, setStep] = useState({});
    const setTitle = (e)=>setStep(prevInput=>({...prevInput, title:e.target.value}));
    const setDescription = (e)=>setStep(prevInput=>({...prevInput, description:e.target.value}));
    const submit = (e)=>{
        e.preventDefault();
        setStep(prevInput=>({...prevInput, image:image}));
        onSubmit(step);
    }
    return (
    <form className="px-5 py-4 border border-red rounded-md" onSubmit={submit}>
        <h5 className="text-center text-xl font-fjalla-one mb-2">{`EDIT STEP ${index}`}</h5>
        <h6 className="text-lg font-nunito font-semibold mb-3">Step Title<span className="text-red">*</span></h6>
        <input 
            type='text' 
            onChange={setTitle} 
            value={step.title || ""} 
            className="bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base w-full text-black"
        />
        <h6 className="text-xl font-semibold my-3">Step Description <span className="text-red">*</span></h6>
        <textarea rows="4" value={step.description || ""} onChange={setDescription} 
            className="p-4 w-full border-red rounded-lg bg-white-primary"/>
        <h6 className="text-xl font-semibold mb-3">Step Image </h6>
        <div {...getRootProps({className: 'dropzone'})} 
            className={`${image?"p-2":"p-10"} bg-white-primary border-red border rounded-md flex flex-col justify-center items-center`}
        >
            <input {...getInputProps()} />
            {image 
            ? <img src={image.preview} alt="recipe" className="w-full h-56 object-contain opacity-75"/>
            :<>
                <AiOutlineCloudUpload className="w-12 h-12 opacity-75 cursor-pointer"/>
                <p className="opacity-75 text-sm text-center w-32 break-words">
                    Drop image here or click to upload
                </p>
            </>}
        </div>
        <div className="mt-4 flex justify-between">
            <Button theme="red" className="text-xl px-12">Cancel</Button>
            <Button theme="orange" className="text-xl px-12">Save</Button>
        </div>
    </form>
    )
}

export default StepForm;