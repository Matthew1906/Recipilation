import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import TextInput from "./TextInput";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { categoryConfig } from "../../utils/theme";

const randomizeTheme = () => categoryConfig[Object.keys(categoryConfig)[Math.floor(Math.random() * Object.keys(categoryConfig).length)]];

const RecipeInformationForm = ()=>{
    const [mockCategories, setMockCategories] = useState([]);
    useEffect(() => {
      setMockCategories(
        ["Lunch", "Dinner", "Western", "Pasta", "Meat"].map((category) => ({
          name: category,
          theme: randomizeTheme(),
        }))
      );
    }, []);
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
    const [information, setInformation] = useState({});
    const setName = (e, prevInput)=>setInformation({...prevInput, name:e.target.value});
    const setDescription = (e, prevInput)=>setInformation({...prevInput, description:e.target.value});
    const setCategories = ()=>console.log("Open Categories Modal");
    const submitForm = (e)=>{
        e.preventDefault();
        console.log(information);
        console.log(image);
    }
    return (
        <form className="px-10 py-8" onSubmit={submitForm}>
            <h2 className="pt-5 flex items-center gap-1 font-fjalla-one text-3xl mb-3 md:mb-0">
                <BackIcon className="cursor-pointer"/> Add New Recipe
            </h2>
            <h4 className="pt-2 font-nunito font-extralight text-2xl">
                Enter your recipe information!
            </h4>
            <div className="md:grid md:grid-cols-2 gap-10">
                <div className="py-5 text-black">
                    <h6 className="text-xl mb-3">Recipe Name <span className="text-red">*</span></h6>
                    <TextInput type='text' onChange={setName} value={information.name || ""} className="w-full"/>
                    <h6 className="text-xl my-3">Recipe Description <span className="text-red">*</span></h6>
                    <textarea rows="10" value={information.description || ""} onChange={setDescription} 
                        className="p-4 w-full border-red rounded-lg bg-white-primary"/>
                    <h6 className="text-xl my-3">Categories</h6>
                    <div className="flex flex-wrap gap-2">
                        {mockCategories.map((category, key)=>(
                            <span key={key} className={`${category.theme} px-4 py-2 rounded-md`}>
                                {category.name}
                            </span>
                        ))}
                        <Button theme="neutral" className="border border-red !rounded-full" onClick={setCategories}>+</Button>
                    </div>
                </div>
                <div className="py-5 text-black">
                    <h6 className="text-xl mb-3">Recipe Image <span className="text-red">*</span></h6>
                    <div {...getRootProps({className: 'dropzone'})} 
                        className={`${image?"p-2":"p-12"} bg-white-primary border-red border rounded-sm flex flex-col justify-center items-center`}
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
                    <div className="mt-4 grid grid-cols-2">
                        <div>
                            <h6 className="text-xl mb-3">Serving Size <span className="text-red">*</span></h6>
                        </div>
                        <div>
                            <h6 className="text-xl mb-3">Difficulty Level <span className="text-red">*</span></h6>
                        </div>
                        <div>
                            <h6 className="text-xl mb-3">Cooking Time <span className="text-red">*</span></h6>
                        </div>
                        <div>
                            <h6 className="text-xl mb-3">Preparation Time <span className="text-red">*</span></h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Button theme="orange" >Continue</Button>
            </div>
        </form>
    );
};

export default RecipeInformationForm;