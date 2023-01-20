import { useForm } from "react-hook-form";
import { ImageInput, InputLabel, NumberInput, SelectInput, TextArea, TextInput } from "./helpers";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { useImage, useMockCategories } from "../../hooks";
import { difficulties, timeLengths } from "../../utils/data";

const RecipeInformationForm = ()=>{
    const mockCategories = useMockCategories();
    const { control, handleSubmit } = useForm({
        defaultValues:{
            name:'', description:'',
            servingSize:1, difficulty:'easy',
            cookingTime:{amount:1, type:'minute'},
            preparationTime:{amount:1, type:'minute'}
        }
    })
    const { image, setImage, getRootProps, getInputProps } = useImage();
    const setCategories = ()=>console.log("Open Categories Modal");
    const onSubmit = (data)=>{
        console.log({...data, image });
        setImage(null);
    }
    return (
        <form className="px-10 py-8" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="pt-5 flex items-center gap-1 font-fjalla-one text-3xl mb-3 md:mb-0">
                <BackIcon className="cursor-pointer"/> Add New Recipe
            </h2>
            <h4 className="pt-2 font-nunito font-extralight text-2xl">
                Enter your recipe information!
            </h4>
            <div className="md:grid md:grid-cols-2 gap-10 font-nunito">
                <div className="py-5 text-black">
                    <InputLabel className="mb-3" required>Recipe Name</InputLabel>
                    <TextInput name="name" control={control} className="w-full text-black"/>
                    <InputLabel className="my-3" required>Recipe Description</InputLabel>
                    <TextArea rows={10} name="description" control={control}/>
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
                                <NumberInput name="servingSize" control={control} className="w-20"/>
                                <span className="ml-2 text-xl grow">people</span>
                            </div>
                        </div>
                        <div>
                            <InputLabel className="mb-3" required>Difficulty Level</InputLabel>
                            <SelectInput 
                                name="difficulty" control={control}
                                options={difficulties} className="w-40"
                            />
                        </div>
                        <div>
                            <InputLabel className="mb-3" required>Preparation Time</InputLabel>
                            <div className="flex items-center gap-2">
                                <NumberInput name="preparationTime.amount" control={control} className="w-16"/>
                                <SelectInput 
                                    name="preparationTime.type" control={control}
                                    options={timeLengths} className="w-28"
                                />
                            </div>
                        </div>
                        <div>
                            <InputLabel className="mb-3" required>Cooking Time</InputLabel>
                            <div className="flex items-center gap-2">
                                <NumberInput name="cookingTime.amount" control={control} className="w-16"/>
                                <SelectInput 
                                    name="cookingTime.type" control={control}
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