import { useAuth } from "../../hooks";
import { RecipeInformationForm, RecipeMaterialForm, RecipeTutorialForm } from "../../components/forms";

const NewRecipe = ()=>{
    // const { isAuthenticated } = useAuth();
    return <RecipeInformationForm />
    // return isAuthenticated?<RecipeInformationForm/>:<></>;
}

export default NewRecipe;