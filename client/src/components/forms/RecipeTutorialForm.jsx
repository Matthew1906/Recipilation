import StepForm from "./StepForm";
import { StepCard } from "../cards";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { steps } from "../../utils/data";

const RecipeTutorialForm = ()=>{
    const addStep = ()=>console.log("Add New Step");
    const submitStep = (data)=>console.log(data);
    return (
        <div className="px-10 py-8">
            <h2 className="pt-5 flex items-center gap-1 font-fjalla-one text-3xl mb-3 md:mb-0">
                <BackIcon className="cursor-pointer"/> Add New Recipe
            </h2>
            <h4 className="pt-2 font-nunito font-extralight text-2xl">
                Enter the steps on how to make your dish!
            </h4>
            <div className="md:grid md:grid-cols-5 gap-10">
                <div className="h-screen overflow-y-scroll py-5 col-span-3 text-black">
                    {steps.slice(0,3).map((step, key)=>(
                        <StepCard key={key} index={key} step={step} />
                    ))}      
                    <div className="flex items-center justify-center">
                        <Button theme="neutral" className="border border-red !rounded-full w-12 h-12" onClick={addStep}>+</Button>
                    </div>
                </div>
                <div className="py-5 col-span-2 text-black">
                    <StepForm onSubmit={submitStep} index={1}/>     
                </div>
            </div>
            <div className="mt-2 flex justify-between">
                <Button theme="yellow" className="text-xl px-12">Back</Button>
                <Button theme="green" className="text-xl px-12">Save Recipe</Button>
            </div>
        </div>
    );
};

export default RecipeTutorialForm;