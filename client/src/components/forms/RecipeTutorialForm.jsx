import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StepForm from "./StepForm";
import { StepCard } from "../cards";
import { BackIcon } from "../icons";
import { Button } from "../utils";
import { saveRecipe } from "../../api/recipe";

const RecipeTutorialForm = ({draft, onSave, onCancel, isEdit})=>{
    const navigate = useNavigate();
    const [steps, setSteps] = useState(draft?.steps.map((step)=>({
        index:step.index, title:step.title, details:step.details, image:step.image
    })).sort((a,b)=>a.index-b.index)??[]);
    const [ isChanged, setIsChanged ] = useState(false);
    const changeItems  = ()=>setIsChanged(true);
    useEffect(()=>{
        if(draft!==null){
            setSteps(draft?.steps.map((step)=>({
                index:step.index, title:step.title, details:step.details, image:step.image
            })).sort((a,b)=>a.index-b.index)??[])
        }
    }, [draft])
    const [ toUpdate, setToUpdate ] = useState(false);
    const addStep = (index, data)=>{
        const { title, details, image } = data;
        setSteps(prev=>[...prev, {index, title, details, image}])
        changeItems();
    }
    const editStep = (index)=>{
        setToUpdate(steps[index])
    }
    const updateStep = (index, data)=>{
        const { title, details, image } = data;
        setSteps(prev=>{
            const updateSteps = [
                ...(prev.filter(val=>val.index!==(index+1))), 
                {index, title, details, image}
            ].sort((a,b)=>a.index-b.index)
            return updateSteps.map((step, index)=>({...step, index:index+1}));
        })
        setToUpdate(false);
        changeItems()
    }
    const deleteStep = (index)=>{
        setSteps(prev=>{
            const deleteSteps = prev.filter(val=>val.index!==(index+1))
            return deleteSteps.map((step, index)=>({...step, index:index+1}));
        })
        changeItems();
    }
    const onSubmit = ()=>onSave(isChanged?{steps}:null);
    return (
        <div className="px-10 py-8">
            <h2 className="pt-5 flex items-center gap-1 font-fjalla-one text-3xl mb-3 md:mb-0">
                <BackIcon className="cursor-pointer" onClick={isEdit?()=>{
                    saveRecipe('final', {}).then(navigate('/'))
                }:false}/> Add New Recipe
            </h2>
            <h4 className="pt-2 font-nunito font-extralight text-2xl mb-5">
                Enter the steps on how to make your dish!
            </h4>
            <div className="md:grid md:grid-cols-5 gap-10 font-nunito">
                <div className="h-screen overflow-y-scroll py-5 col-span-3 text-black">
                    {steps.map((step, index)=>(
                        <StepCard key={index} index={index} step={step} onDelete={deleteStep} onUpdate={editStep}/>
                    ))}      
                </div>
                <div className="py-5 col-span-2 text-black">
                    <StepForm 
                        onSubmit={
                            toUpdate
                            ?(data)=>updateStep(toUpdate.index-1, data)
                            :(data)=>addStep(steps.length+1, data)
                        } 
                        index={toUpdate?toUpdate.index:steps.length+1}
                        isUpdate={toUpdate}
                    />     
                </div>
            </div>
            <div className="mt-2 flex justify-between">
                <Button theme="yellow" className="text-sm sm:text-md lg:text-xl px-3 md:px-6 lg:px-12" onClick={onCancel}>Back</Button>
                <Button theme="green" className="text-sm sm:text-md lg:text-xl px-3 md:px-6 lg:px-12" onClick={onSubmit}>Save Recipe</Button>
            </div>
        </div>
    );
};

RecipeTutorialForm.propTypes = {
    draft: PropTypes.object, 
    onSave: PropTypes.func, 
    onCancel: PropTypes.func, 
    isEdit: PropTypes.bool
}

export default RecipeTutorialForm;