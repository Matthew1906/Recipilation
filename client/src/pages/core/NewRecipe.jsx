import { useState, useEffect } from "react";
import { RecipeInformationForm, RecipeMaterialForm, RecipeTutorialForm } from "../../components/forms";
import { getRecipeDraft, saveRecipe } from "../../api/recipe";

const NewRecipe = ()=>{
    const [ draft, setDraft ] = useState(null);
    const [ index, setIndex ] = useState(0);
    
    useEffect(()=>{
        getRecipeDraft().then(res=>setDraft(res.data));
    }, [index])

    const saveInformation = (data)=>{
        if(data===null){
            setIndex(1);
        }
        else{
            saveRecipe("information", data).then(res=>{
                setDraft(res.data);
                setIndex(1);
            }).catch(err=>console.log(err));
        }
    };

    const saveMaterials = (data)=>{
        if(data===null){
            setIndex(2);
        }
        else{
            // console.log(data);
            saveRecipe("material", data).then(res=>{
                setDraft(res.data);
                setIndex(2);
            }).catch(err=>console.log(err));
        }
    };

    const saveTutorial = (data)=>{
        saveRecipe("tutorial", data).then(res=>{
            setDraft(res.data);
            setIndex(0);
        })
    };

    const forms = [
        <RecipeInformationForm onSave={saveInformation} draft={draft}/>, 
        <RecipeMaterialForm onSave={saveMaterials} draft={draft} onCancel={()=>setIndex(0)}/>, 
        <RecipeTutorialForm onSave={saveTutorial} draft={draft} onCancel={()=>setIndex(1)}/>
    ];

    return forms[index];
}

export default NewRecipe;