import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { EquipmentCard } from "../cards";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { equipments, ingredients } from "../../utils/data";

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

const IngredientListForm = ()=>{
    const [ingredient, setIngredient] = useState({});
    const setAmount = (e)=>setIngredient(prevInput=>({...prevInput, amount:e.target.value}));
    const setMeasurement = (e)=>setIngredient(prevInput=>({...prevInput, measurement:e.target.value}));
    const setName = (e)=>setIngredient(prevInput=>({...prevInput, name:e.target.value}));
    const setDetails = (e)=>setIngredient(prevInput=>({...prevInput, details:e.target.value}));
    const submitForm = (e)=>{
        e.preventDefault();
        console.log(ingredient);
    }
    return(
    <li className="mb-2 text-sm">
        <form className="flex justify-start items-start gap-2" onSubmit={submitForm}>
            <div>
                <label className="font-semibold">Amount</label>
                <input 
                    type='number' 
                    value={ingredient.amount || "1"} 
                    onChange={setAmount} 
                    className="mt-1 bg-white-primary border-red border rounded-md p-1 text-xs md:text-sm w-10 text-black"
                />
            </div>
            <div>
                <label className="font-semibold">Measurement Unit</label>
                <input 
                    type='text' 
                    value={ingredient.measurement || ""} 
                    onChange={setMeasurement} 
                    className="mt-1 bg-white-primary border-red border rounded-md p-1 text-xs md:text-sm text-black"
                />
            </div>
            <div>
                <label className="font-semibold">Ingredient Name</label>
                <input 
                    type='text' 
                    value={ingredient.name || ""} 
                    onChange={setName} 
                    className="mt-1 w-auto bg-white-primary border-red border rounded-md p-1 text-xs md:text-sm text-black"
                />
            </div>
            <div>
                <label className="font-semibold">Extra Details</label>
                <input 
                    type='text' 
                    value={ingredient.details || ""} 
                    onChange={setDetails} 
                    className="mt-1 bg-white-primary border-red border rounded-md p-1 text-xs md:text-sm text-black"
                />
                <div className="mt-2 flex justify-between items-center gap-3">
                    <Button theme="yellow" className="grow">Save</Button>
                    <Button theme="red"className="grow">Cancel</Button>
                </div>
            </div>
        </form>
    </li>
    );
};

const RecipeMaterialForm = ()=>{
    const addIngredients = ()=>console.log("Add new ingredient");
    const setEquipments = ()=>console.log("Open equipment modal");
    const submitForm = (e)=>{
        e.preventDefault();
        console.log("Submit");
    }
    return (
        <form className="px-10 py-8" onSubmit={submitForm}>
            <h2 className="pt-5 flex items-center gap-1 font-fjalla-one text-3xl mb-3 md:mb-0">
                <BackIcon className="cursor-pointer"/> Add New Recipe
            </h2>
            <h4 className="pt-2 font-nunito font-extralight text-2xl">
                Enter your recipe equipments and ingredients!
            </h4>
            <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                <div className="py-5 text-black">
                    <h6 className="text-xl font-semibold mb-3">Recipe Ingredients<span className="text-red">*</span></h6>
                    <ul className="list-disc list-outside px-5">
                        {ingredients.map((ingredient, key)=>(
                            <IngredientListItem ingredient={ingredient} key={key}/>
                        ))}
                        <IngredientListForm/>
                        <IngredientListForm/>
                    </ul>
                    <div className="flex items-center justify-center">
                        <Button theme="neutral" className="border border-red !rounded-full w-12 h-12" onClick={addIngredients}>+</Button>
                    </div>
                </div>
                <div className="py-5 text-black">
                    <h6 className="text-xl font-semibold mb-3">Recipe Equipments<span className="text-red">*</span></h6>
                    <div className="grid grid-cols-3 gap-y-4 justify-items-center">
                        {equipments.slice(0, 5).map((equipment, key)=>(
                            <EquipmentCard equipment={equipment} key={key}/>
                        ))}
                        <div className={`flex items-center justify-center ${equipments.slice(0, 5).length%3!==0?"":"col-span-3"}`}>
                            <Button theme="neutral" className="border border-red !rounded-full w-12 h-12" onClick={setEquipments}>+</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex justify-between">
                <Button theme="yellow" className="text-xl px-12">Back</Button>
                <Button theme="orange" className="text-xl px-12">Continue</Button>
            </div>
        </form>
    );
};

export default RecipeMaterialForm;