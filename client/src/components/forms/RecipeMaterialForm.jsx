import { useController, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"; 
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { InputLabel } from "./helpers";
import { EquipmentCard } from "../cards";
import { BackIcon } from "../icons";
import { EquipmentModal } from "../modals";
import { Button } from "../utils";
import { equipments, ingredients } from "../../utils/data";
import { titleString } from "../../utils/string";

const IngredientListItem = ({ingredient})=>{
    const editIngredient = ()=>console.log("Edit Ingredient");
    const deleteIngredient = ()=>console.log("Delete Ingredient");
    return (
        <li className="mb-2 text-lg">
            <div className="flex items-center ">
                {`${ingredient.amount} ${ingredient.measurement} of`} 
                <span className="font-bold mx-1">{ingredient.name}</span>
                {ingredient.details}
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

const IngredientListInput = ({type, name, control, className})=>{
    const { field } = useController({name, control, rules:{required:`${titleString(name)} must be filled`}}); 
    return (
        <input 
            type={type} 
            value={field.value} 
            onChange={field.onChange} 
            className={`mt-1 bg-white-primary border-red border rounded-md p-1 text-xs md:text-sm text-black ${className}`}
        />
    )
}

const IngredientListForm = ()=>{
    const { control, handleSubmit, formState:{errors} } = useForm({
        defaultValues:{
            amount:1, 
            measurement:"",
            name:"",
            details:""
        }
    });
    const onSubmit = (data)=>console.log(data);
    return(
        <li className="mb-2 text-sm">
            <form className="flex justify-start items-start gap-2 font-nunito" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="font-semibold">Amount</label>
                    <IngredientListInput type='number' name="amount" control={control} className="w-10"/>
                    <ErrorMessage errors={errors} name="amount" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
                </div>
                <div>
                    <label className="font-semibold">Measurement Unit</label>
                    <IngredientListInput type='text' name="measurement" control={control}/>
                    <ErrorMessage errors={errors} name="measurement" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
                </div>
                <div>
                    <label className="font-semibold">Ingredient Name</label>
                    <IngredientListInput type='text' name="name" control={control}/>
                    <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
                </div>
                <div>
                    <label className="font-semibold">Extra Details</label>
                    <IngredientListInput type='text' name="details" control={control}/>
                    <ErrorMessage errors={errors} name="details" render={({ message }) => <p className="mt-2 text-xs text-left text-red">{message}</p>}/>
                    <div className="mt-2 flex justify-between items-center gap-3">
                        <Button theme="yellow" className="grow">Save</Button>
                        <Button theme="red"className="grow">Cancel</Button>
                    </div>
                </div>
            </form>
        </li>
    );
};

const RecipeMaterialForm = ({onSave, onCancel})=>{
    const submit = ()=>onSave('materials');
    const saveEquipments = (data)=>console.log(data);
    const addIngredients = ()=>console.log("Add new ingredient");
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
                            <IngredientListItem ingredient={ingredient} key={key}/>
                        ))}
                        <IngredientListForm/>
                    </ul>
                    <div className="flex items-center justify-center">
                        <Button theme="neutral" className="border border-red !rounded-full w-12 h-12" onClick={addIngredients}>+</Button>
                    </div>
                </div>
                <div className="py-5 text-black">
                    <InputLabel className="mb-3" required>Recipe Equipments</InputLabel>
                    <div className="grid grid-cols-3 gap-y-4 justify-items-center">
                        {equipments.slice(0, 5).map((equipment, key)=>(
                            <EquipmentCard equipment={equipment} key={key}/>
                        ))}
                        <div className={`flex items-center justify-center ${equipments.slice(0, 5).length%3===0 && "col-span-3"}`}>
                            <EquipmentModal onSubmit={saveEquipments}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex justify-between">
                <Button theme="yellow" className="text-xl px-12" onClick={onCancel}>Back</Button>
                <Button theme="orange" className="text-xl px-12" onClick={submit}>Continue</Button>
            </div>
        </div>
    );
};

export default RecipeMaterialForm;