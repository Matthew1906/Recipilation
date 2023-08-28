import { useState, useEffect } from "react";
import { RecipeInformationForm, RecipeMaterialForm, RecipeTutorialForm } from "../../components/forms";
import { getRecipeDraft } from "../../api/recipe";

const NewRecipe = ()=>{
    const [ draft, setDraft ] = useState(null);
    const [ index, setIndex ] = useState(0);
    
    useEffect(()=>{
        getRecipeDraft().then(res=>setDraft(res.data));
    }, [index, draft])

    const saveInformation = (data)=>{
        console.log(data);
        setIndex(1)
    }

    const saveMaterials = (data)=>{
        console.log(data);
        setIndex(2);
    }

    const saveTutorial = (data)=>{
        console.log(data);
        setIndex(0);
    }

    const forms = [
        <RecipeInformationForm onSave={saveInformation}/>, 
        <RecipeMaterialForm onSave={saveMaterials} onCancel={()=>setIndex(0)}/>, 
        <RecipeTutorialForm onSave={saveTutorial} onCancel={()=>setIndex(1)}/>
    ];

    return forms[index];
}

export default NewRecipe;