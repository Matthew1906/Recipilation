import { BackIcon } from "../icons";
import { Button } from "../utils";

const RecipeTutorialForm = ()=>{
    const submitForm = ()=>console.log("Submit");
    return (
        <form className="px-10 py-8" onSubmit={submitForm}>
            <h2 className="pt-5 flex items-center gap-1 font-fjalla-one text-3xl mb-3 md:mb-0">
                <BackIcon className="cursor-pointer"/> Add New Recipe
            </h2>
            <h4 className="pt-2 font-nunito font-extralight text-2xl">
                Enter the steps on how to make your dish!
            </h4>
            <div className="md:grid md:grid-cols-2 gap-10">
                <div className="py-5 text-black">
                    
                </div>
                <div className="py-5 text-black">
                    
                </div>
            </div>
            <div className="mt-2 flex justify-between">
                <Button theme="yellow" className="text-xl px-12">Back</Button>
                <Button theme="orange" className="text-xl px-12">Continue</Button>
            </div>
        </form>
    );
};

export default RecipeTutorialForm;