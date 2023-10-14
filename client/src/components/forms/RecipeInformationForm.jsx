import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ImageInput, InputLabel, NumberInput, SelectInput, TextArea, TextInput } from "./helpers";
import { BackIcon } from "../icons";
import { CategoryModal } from "../modals";
import { Button } from "../utils";
import { useImage } from "../../hooks";
import { difficulties, timeLengths } from "../../utils/data";
import { base64String } from "../../utils/string";
import { categoryConfig } from "../../utils/theme";

const configThemeCategories = (categories)=>{
    const randomizeTheme = () => categoryConfig[Object.keys(categoryConfig)[Math.floor(Math.random() * Object.keys(categoryConfig).length)]];
    return categories.map((category) => ({
        name: category,
        theme: randomizeTheme(),
    }));
}

const RecipeInformationForm = ({draft, onSave})=>{
    // Check for changes
    const [isChanged, setIsChanged ] = useState(false);
    // Handling categories selection
    const [ chosenCategories, setChosenCategories] = useState(
        configThemeCategories(draft?.categories.map(category=>category.name)??[])
    );
    const addCategory = (data)=>{
        setChosenCategories(configThemeCategories(data));
        setIsChanged(true);
    };
    // Form Control
    const { control, setValue, handleSubmit, formState:{errors, submitCount, isDirty} } = useForm({
        defaultValues:{
            name:draft?.name??'', description:draft?.description??'',
            servingSize:draft?.serving_size??1, difficulty:draft?.difficulty??'easy',
            cookingTime:{
                amount:draft?.cooking_time.split(' ')[0]??1, 
                type:draft?.cooking_time.split(' ')[1]??'minute'
            },
            preparationTime:{
                amount:draft?.preparation_time.split(' ')[0]??1, 
                type:draft?.preparation_time.split(' ')[1]??'minute'
            }
        }
    });
    // Image input control
    const { image, setImage, getRootProps, getInputProps, imageError } = useImage();
    useEffect(()=>{
        if(draft!==null){
            setChosenCategories(configThemeCategories(draft.categories.map(category=>category.name)))
            setValue('name', draft.name);
            setValue('description', draft.description);
            setValue('difficulty', draft.difficulty);
            setValue('servingSize', draft.serving_size);
            setValue('cookingTime.amount', Number(draft.cooking_time.split(" ")[0]))
            setValue('cookingTime.type', draft.cooking_time.split(" ")[1])
            setValue('preparationTime.amount', Number(draft.preparation_time.split(" ")[0]))
            setValue('preparationTime.type', draft.preparation_time.split(" ")[1])
            setImage({preview:draft.image})
        }
    }, [setValue, setImage, draft]);
    // Handle submit
    const onSubmit = (data)=>{
        if((!isDirty && !isChanged)){
            onSave(null);
        } 
        else if(image!==null){
            fetch(image.preview).then(r => {
                r.blob().then(res=>base64String(res).then(res=>{
                    onSave({...data, image:res, categories:chosenCategories.map(category=>category.name)});
                }))
            });
        }
        else{
            onSave({...data, image, categories:chosenCategories.map(category=>category.name)});
        }
    }
    // Return Component
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
                    <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
                    <InputLabel className="my-3" required>Recipe Description</InputLabel>
                    <TextArea rows={10} name="description" control={control}/>
                    <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="mt-1 text-xs text-left text-red">{message}</p>}/>
                    <InputLabel className="my-3">Categories</InputLabel>
                    <div className="flex flex-wrap gap-2">
                        {chosenCategories.map((category, key)=>(
                            <span key={key} className={`${category.theme} px-4 py-2 rounded-md flex items-center justify-center`}>
                                {category.name}
                            </span>
                        ))}
                        <CategoryModal onSubmit={addCategory} draft={draft?.categories.map(category=>category.name)??[]}/>
                    </div>
                </div>
                <div className="py-5 text-black">
                    <InputLabel className="mb-3" required>Recipe Image</InputLabel>
                    <ImageInput image={image} rootProps={getRootProps} inputProps={getInputProps} p={20}/>
                    {submitCount>0 && imageError && <p className="mt-2 text-xs text-left text-red">Must insert image</p>}
                    <div className="mt-4 grid grid-cols-2 gap-6">
                        <div className="mb-3 mr-2">
                            <InputLabel className="mb-3" required>Serving Size</InputLabel>
                            <div className="flex items-center">
                                <NumberInput name="servingSize" control={control} max={20} className="w-20"/>
                                <span className="ml-2 text-xl grow">people</span>
                            </div>
                            <ErrorMessage errors={errors} name="servingSize" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
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
                                <NumberInput name="preparationTime.amount" control={control} max={60} className="w-16"/>
                                <SelectInput 
                                    name="preparationTime.type" control={control}
                                    options={timeLengths} className="w-28"
                                />
                            </div>
                            <ErrorMessage errors={errors} name="preparationTime.amount" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
                        </div>
                        <div>
                            <InputLabel className="mb-3" required>Cooking Time</InputLabel>
                            <div className="flex items-center gap-2">
                                <NumberInput name="cookingTime.amount" control={control} max={60} className="w-16"/>
                                <SelectInput 
                                    name="cookingTime.type" control={control}
                                    options={timeLengths} className="w-28"
                                />
                            </div>
                            <ErrorMessage errors={errors} name="cookingTime.amount" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex justify-center">
                <Button theme="orange" className="text-xl px-12">Save and Continue</Button>
            </div>
        </form>
    );
};

export default RecipeInformationForm;