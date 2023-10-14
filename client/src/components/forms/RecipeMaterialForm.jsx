import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"; 
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { InputLabel } from "./helpers";
import { EquipmentCard } from "../cards";
import { BackIcon } from "../icons";
import { EquipmentModal } from "../modals";
import { Button } from "../utils";
import { titleString } from "../../utils/string";

const IngredientListItem = ({ingredient, onUpdate, onDelete})=>{
    const editIngredient = ()=>onUpdate(ingredient.index);
    const deleteIngredient = ()=>onDelete(ingredient.index);
    return (
        <li className="mb-2 text-lg">
            <div className="flex items-center ">
                {ingredient.name} 
                <div className="ml-2 flex gap-1 font-bold">
                    <FaTrashAlt
                        className="text-red cursor-pointer link-expand"
                        onClick={deleteIngredient}
                    />
                    <FaEdit
                        className="cursor-pointer link-expand"
                        onClick={editIngredient}
                    />
                </div>
            </div>
        </li>
    );
}

const IngredientListInput = ({type, name, control })=>{
    const { field } = useController({name, control, rules:{required:`${titleString(name)} must be filled`}}); 
    return (
        <input 
            type={type} 
            value={field.value} 
            onChange={field.onChange} 
            className={`mt-1 bg-white-primary border-red border rounded-md p-1 text-xs md:text-sm text-black grow`}
        />
    )
}

const IngredientListForm = ({ingredient, onSubmit, onCancel})=>{
    const { control, handleSubmit, setValue, formState:{errors} } = useForm({
        defaultValues:{
            name:ingredient?.name??""
        }
    });
    useEffect(()=>setValue('name', ingredient.name), [setValue, ingredient.name]);
    const cancelForm = ()=>onCancel(ingredient.index);
    const submitForm = (data)=>onSubmit(ingredient.index, data.name)
    return(
        <li className="mb-2 text-sm">
            <form className="flex flex-col gap-2 font-nunito" onSubmit={handleSubmit(submitForm)}>
                <label className="font-semibold">Ingredient Name</label>
                <IngredientListInput type='text' name="name" control={control}/>
                <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
                <div className="mt-2 flex justify-end items-center gap-3">
                    <Button theme="yellow">Save</Button>
                    <Button theme="red" onClick={cancelForm}>Cancel</Button>
                </div>
            </form>
        </li>
    );
};

const RecipeMaterialForm = ({draft, onSave, onCancel, isEdit})=>{
    const [ isChanged, setIsChanged ] = useState(false);
    const changeItems  = ()=>setIsChanged(true);
    const [ ingredients, setIngredients ] = useState((draft?.ingredients??[]).map((ingredient, index)=>({index, name:ingredient, isUpdate:false})));
    const [ equipments, setEquipments ] = useState(draft?.equipments??[]);
    // Retrieve draft
    useEffect(()=>{
        if(draft!==null){
            setIngredients((draft?.ingredients??[]).map((ingredient, index)=>({index, name:ingredient, isUpdate:false})));
            setEquipments(draft?.equipments??[]);
        }
    }, [draft])
    // Manage Ingredients
    const addIngredient = ()=>{
        setIngredients(prev=>[...prev, {index:prev.length, isUpdate:true, name:""}])
        changeItems();
    };
    const changeIngredient = (index, data)=>{
        setIngredients(prev=>[...(prev.filter(val=>val.index!==index)), {index, name:data, isUpdate:false}])
        changeItems();
    }
    const updateIngredient = (index)=>{
        const ingredient = ingredients.filter(val=>val.index===index)[0];
        setIngredients(prev=>[...(prev.filter(val=>val.index!==index)), {index:ingredient.index, name:ingredient.name, isUpdate:true}])
        changeItems()
    }
    const deleteIngredient = (index)=>{
        setIngredients(prev=>prev.filter(val=>val.index!==index))
        changeItems()
    }
    // Manage Equipments
    const addEquipments = (data)=>{
        setEquipments(data);
        changeItems();
    }
    // Submit form 
    const onSubmit = ()=>onSave(isChanged?{
        equipments:equipments.map(equipment=>equipment._id), 
        ingredients:ingredients.map(ingredient=>ingredient.name)
    }:null);
    return (
        <div className="px-10 py-8">
            <h2 className="pt-5 flex items-center gap-1 font-fjalla-one text-3xl mb-3 md:mb-0">
                <BackIcon className="cursor-pointer"/> Add New Recipe
            </h2>
            <h4 className="pt-2 font-nunito font-extralight text-2xl">
                Enter your recipe equipments and ingredients!
            </h4>
            <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                <div className="py-5 text-black">
                    <InputLabel className="mb-3" required>Recipe Ingredients</InputLabel>
                    <ul className="list-disc list-outside px-5">
                        {ingredients.map((ingredient, key)=>(
                            ingredient.isUpdate
                            ?<IngredientListForm ingredient={ingredient} key={key} onSubmit={changeIngredient} onCancel={deleteIngredient}/>
                            :<IngredientListItem ingredient={ingredient} key={key} onUpdate={updateIngredient} onDelete={deleteIngredient}/>
                        ))}
                    </ul>
                    <div className="flex items-center justify-center">
                        <Button theme="neutral" className="border border-red !rounded-full w-12 h-12" onClick={addIngredient}>+</Button>
                    </div>
                </div>
                <div className="py-5 text-black">
                    <InputLabel className="mb-3" required>Recipe Equipments</InputLabel>
                    <div className="grid grid-cols-3 gap-y-4 justify-items-center">
                        {equipments.map((equipment, key)=>(
                            <EquipmentCard equipment={equipment} key={key}/>
                        ))}
                        <div className={`flex items-center justify-center col-span-3`}>
                            <EquipmentModal onSubmit={addEquipments} draft={equipments}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex justify-between">
                <Button theme="yellow" className="text-sm sm:text-md lg:text-xl px-3 md:px-6 lg:px-12" onClick={onCancel}>Back</Button>
                <Button theme="orange" className="text-sm sm:text-md lg:text-xl px-3 md:px-6 lg:px-12" onClick={onSubmit}>Save and Continue</Button>
            </div>
        </div>
    );
};

export default RecipeMaterialForm;