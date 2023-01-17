import { BackIcon } from "../icons";
import { Button } from "../utils";
import StepForm from "./StepForm";
import { steps } from "../../utils/data";
import { StepCard } from "../cards";

const RecipeTutorialForm = ()=>{
    const submitForm = ()=>console.log("Submit");
    const submitStep = (data)=>console.log(data);
    return (
        <form className="px-10 py-8" onSubmit={submitForm}>
            <h2 className="pt-5 flex items-center gap-1 font-fjalla-one text-3xl mb-3 md:mb-0">
                <BackIcon className="cursor-pointer"/> Add New Recipe
            </h2>
            <h4 className="pt-2 font-nunito font-extralight text-2xl">
                Enter the steps on how to make your dish!
            </h4>
            <div className="md:grid md:grid-cols-5 gap-10">
                <div className="py-5 col-span-3 text-black">
                    {steps.slice(0,3).map((step, key)=>(
                        <StepCard index={key} step={step} />
                    ))}      
                </div>
                <div className="py-5 col-span-2 text-black">
                    <StepForm onSubmit={submitStep} index={1}/>     
                </div>
            </div>
            <div className="mt-2 flex justify-between">
                <Button theme="yellow" className="text-xl px-12">Back</Button>
                <Button theme="green" className="text-xl px-12">Save Recipe</Button>
            </div>
        </form>
    );
};

export default RecipeTutorialForm;