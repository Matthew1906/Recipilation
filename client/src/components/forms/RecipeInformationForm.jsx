import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
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
    const setName = (e)=>setInformation(prevInput=>({...prevInput, name:e.target.value}));
    const setDescription = (e)=>setInformation(prevInput=>({...prevInput, description:e.target.value}));
    const setCategories = ()=>console.log("Open Categories Modal");
    const setServingSize = (e)=>setInformation(prevInput=>({...prevInput, servingSize:e.target.value}));
    const setDifficulty = (e)=>setInformation(prevInput=>({...prevInput, difficulty:e.target.value}));
    const [cookingTime, setCookingTime] = useState({});
    const setCookingTimeAmount = (e)=>setCookingTime(prevInput=>({...prevInput, amount:e.target.value}));
    const setCookingTimeType = (e)=>setCookingTime(prevInput=>({...prevInput, type:e.target.value}));
    const [preparationTime, setPreparationTime] = useState({});
    const setPreparationTimeAmount = (e)=>setPreparationTime(prevInput=>({...prevInput, amount:e.target.value}));
    const setPreparationTimeType = (e)=>setPreparationTime(prevInput=>({...prevInput, type:e.target.value}));
    const submitForm = (e)=>{
        e.preventDefault();
        setInformation(prevInput=>({...prevInput, image:image, cookingTime:{
            amount:cookingTime.amount,
            type:cookingTime.type
        }, preparationTime:{
            amount:preparationTime.amount,
            type:preparationTime.type
        }}));
        console.log(information);
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
                    <h6 className="text-xl font-semibold mb-3">Recipe Name <span className="text-red">*</span></h6>
                    <input 
                        type='text' 
                        onChange={setName} 
                        value={information.name || ""} 
                        className="bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base w-full text-black"
                    />
                    <h6 className="text-xl font-semibold my-3">Recipe Description <span className="text-red">*</span></h6>
                    <textarea rows="10" value={information.description || ""} onChange={setDescription} 
                        className="p-4 w-full border-red rounded-lg bg-white-primary"/>
                    <h6 className="text-xl font-semibold my-3">Categories</h6>
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
                    <h6 className="text-xl font-semibold mb-3">Recipe Image <span className="text-red">*</span></h6>
                    <div {...getRootProps({className: 'dropzone'})} 
                        className={`${image?"p-2":"p-20"} bg-white-primary border-red border rounded-sm flex flex-col justify-center items-center`}
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
                    <div className="mt-4 grid grid-cols-2 gap-6">
                        <div className="mb-3 mr-2">
                            <h6 className="text-xl font-semibold mb-3">Serving Size <span className="text-red">*</span></h6>
                            <div className="flex items-center">
                                <input 
                                    type='number' 
                                    value={information.servingSize || "1"} 
                                    onChange={setServingSize} 
                                    className="bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base w-20 text-black"
                                />
                                <span className="ml-2 text-xl grow">people</span>
                            </div>
                        </div>
                        <div>
                            <h6 className="text-xl font-semibold mb-3">Difficulty Level <span className="text-red">*</span></h6>
                            <select onChange={setDifficulty} value={information.difficulty || "easy"} className="w-40 bg-white-primary border-red border rounded-md px-3 py-2 text-black text-sm md:text-base">
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div>
                            <h6 className="text-xl font-semibold mb-3">Preparation Time <span className="text-red">*</span></h6>
                            <div className="flex items-center gap-2">
                                <input 
                                    type='number' 
                                    value={preparationTime.amount || "1"} 
                                    onChange={setPreparationTimeAmount} 
                                    className="bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base w-16 text-black"
                                />
                                <select onChange={setPreparationTimeType} value={preparationTime.type || "minute"} className="w-28 bg-white-primary border-red border rounded-md px-3 py-2 text-black text-sm md:text-base">
                                    <option value="second">seconds</option>
                                    <option value="minute">minutes</option>
                                    <option value="hour">hours</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <h6 className="text-xl font-semibold mb-3">Cooking Time <span className="text-red">*</span></h6>
                            <div className="flex items-center gap-2">
                                <input 
                                    type='number' 
                                    value={cookingTime.amount || "1"} 
                                    onChange={setCookingTimeAmount} 
                                    className="bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base w-16 text-black"
                                />
                                <select onChange={setCookingTimeType} value={cookingTime.type || "minute"} className="w-28 bg-white-primary border-red border rounded-md px-3 py-2 text-black text-sm md:text-base">
                                    <option value="second">seconds</option>
                                    <option value="minute">minutes</option>
                                    <option value="hour">hours</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex justify-center">
                <Button theme="orange" className="text-xl px-12">Continue</Button>
            </div>
        </form>
    );
};

export default RecipeInformationForm;