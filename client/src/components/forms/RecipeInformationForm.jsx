import { useState, useEffect } from "react";
import { ImageInput, InputLabel, NumberInput, SelectInput, TextArea, TextInput } from "./helpers";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { useImage, useRecipeTime } from "../../hooks";
import { categoryConfig } from "../../utils/theme";
import { difficulties, timeLengths } from "../../utils/data";

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
    const [ information, setInformation ] = useState({servingSize:1, difficulty:'easy'});
    const { image, setImage, getRootProps, getInputProps } = useImage();
    const [ cookingTime, setCookingTimeAmount, setCookingTimeType] = useRecipeTime();
    const [ preparationTime, setPreparationTimeAmount, setPreparationTimeType] = useRecipeTime();
    const setName = (e)=>setInformation(prevInput=>({...prevInput, name:e.target.value}));
    const setDescription = (e)=>setInformation(prevInput=>({...prevInput, description:e.target.value}));
    const setCategories = ()=>console.log("Open Categories Modal");
    const setServingSize = (e)=>setInformation(prevInput=>({...prevInput, servingSize:e.target.value}));
    const setDifficulty = (e)=>setInformation(prevInput=>({...prevInput, difficulty:e.target.value}));
    const submitForm = (e)=>{
        e.preventDefault();
        console.log({
            ...information, 
            image,
            cookingTime:{amount:cookingTime.amount, type:cookingTime.type}, 
            preparationTime:{amount:preparationTime.amount, type:preparationTime.type}
        });
        setImage(null);
    }
    return (
        <form className="px-10 py-8" onSubmit={submitForm}>
            <h2 className="pt-5 flex items-center gap-1 font-fjalla-one text-3xl mb-3 md:mb-0">
                <BackIcon className="cursor-pointer"/> Add New Recipe
            </h2>
            <h4 className="pt-2 font-nunito font-extralight text-2xl">
                Enter your recipe information!
            </h4>
            <div className="md:grid md:grid-cols-2 gap-10 font-nunito">
                <div className="py-5 text-black">
                    <InputLabel className="mb-3" required>Recipe Name</InputLabel>
                    <TextInput onChange={setName} value={information.name || ""} className="w-full text-black"/>
                    <InputLabel className="my-3" required>Recipe Description</InputLabel>
                    <TextArea rows={10} value={information.description || ""} onChange={setDescription}/>
                    <InputLabel className="my-3">Categories</InputLabel>
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
                    <InputLabel className="mb-3" required>Recipe Image</InputLabel>
                    <ImageInput image={image} rootProps={getRootProps} inputProps={getInputProps} p={20}/>
                    <div className="mt-4 grid grid-cols-2 gap-6">
                        <div className="mb-3 mr-2">
                            <InputLabel className="mb-3" required>Serving Size</InputLabel>
                            <div className="flex items-center">
                                <NumberInput value={information.servingSize} onChange={setServingSize} className="w-20"/>
                                <span className="ml-2 text-xl grow">people</span>
                            </div>
                        </div>
                        <div>
                            <InputLabel className="mb-3" required>Difficulty Level</InputLabel>
                            <SelectInput 
                                onChange={setDifficulty} value={information.difficulty} 
                                options={difficulties} className="w-40"
                            />
                        </div>
                        <div>
                            <InputLabel className="mb-3" required>Preparation Time</InputLabel>
                            <div className="flex items-center gap-2">
                                <NumberInput value={preparationTime.amount} onChange={setPreparationTimeAmount} className="w-16"/>
                                <SelectInput 
                                    onChange={setPreparationTimeType} value={preparationTime.type} 
                                    options={timeLengths} className="w-28"
                                />
                            </div>
                        </div>
                        <div>
                            <InputLabel className="mb-3" required>Cooking Time</InputLabel>
                            <div className="flex items-center gap-2">
                                <NumberInput value={cookingTime.amount} onChange={setCookingTimeAmount} className="w-16"/>
                                <SelectInput 
                                    onChange={setCookingTimeType} value={cookingTime.type} 
                                    options={timeLengths} className="w-28"
                                />
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