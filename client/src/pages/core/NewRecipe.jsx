import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { RecipeInformationForm, RecipeMaterialForm, RecipeTutorialForm } from "../../components/forms";
import { getRecipe, getRecipeDraft, saveRecipe, updateRecipe } from "../../api/recipe";
import { base64String } from "../../utils/string";

const NewRecipe = ({isEdit=false})=>{
    const navigate = useNavigate();
    const { slug } = useParams(); 
    const [ draft, setDraft ] = useState(null);
    const [ index, setIndex ] = useState(0);
    
    useEffect(()=>{
        if(isEdit){
            getRecipe(slug).then(res=>setDraft(res.data));
        }
        else{
            getRecipeDraft().then(res=>setDraft(res.data));
        }
    }, [index, isEdit, slug])

    const saveInformation = (data)=>{
        if(data===null){
            setIndex(1);
        }
        else{
            if(!isEdit){
                saveRecipe("information", data).then(res=>{
                    setDraft(res.data);
                    setIndex(1);
                }).catch(err=>console.log(err));
            }
            else{
                updateRecipe(slug, "information", data).then(res=>{
                    setDraft(res.data);
                    setIndex(1);
                }).catch(err=>console.log(err));
            }
        }
    };

    const saveMaterials = (data)=>{
        if(data===null){
            setIndex(2);
        }
        else{
            if(!isEdit){
                saveRecipe("material", data).then(res=>{
                    setDraft(res.data);
                    setIndex(2);
                }).catch(err=>console.log(err));
            }
            else{
                updateRecipe(slug, "material", data).then(res=>{
                    setDraft(res.data);
                    setIndex(2);
                }).catch(err=>console.log(err));
            }
            
        }
    };

    const saveTutorial = (data)=>{
        if(data===null){
            if(isEdit){
                updateRecipe(slug, "final", {})
                .then(res=>navigate("/recipes/"+res.data.slug)).catch(err=>console.log(err))
            }
            else{
                saveRecipe('final', {})
                .then(res=>navigate("/recipes/"+res.data.slug)).catch(err=>console.log(err))
            }
        }
        else{
            Promise.all(data.steps.map(async step=>{
                fetch(step.image).then(r => {
                    r.blob()
                    .then(res=>base64String(res)
                    .then(res=>{
                        if(isEdit){
                            updateRecipe(slug, "tutorial", {...step, image:res})
                        }
                        else{
                            saveRecipe("tutorial", {...step, image:res})
                        }
                    }))
                });
            })).then(()=>{
                    if(isEdit){
                        updateRecipe(slug, "final", {})
                        .then(res=>navigate("/recipes/"+res.data.slug)).catch(err=>console.log(err))
                    }
                    else{
                        saveRecipe('final', {})
                        .then(res=>navigate("/recipes/"+res.data.slug)).catch(err=>console.log(err))
                    }
                })
                .catch(err=>console.log(err));
            
        }
    };

    const forms = [
        <RecipeInformationForm onSave={saveInformation} draft={draft} isEdit={isEdit}/>, 
        <RecipeMaterialForm onSave={saveMaterials} draft={draft} onCancel={()=>setIndex(0)} isEdit={isEdit}/>, 
        <RecipeTutorialForm onSave={saveTutorial} draft={draft} onCancel={()=>setIndex(1)} isEdit={isEdit}/>
    ];

    return forms[index];
}

export default NewRecipe;