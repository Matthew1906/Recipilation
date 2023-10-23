import { useQuery } from "react-query";
import { useAuth } from "../utils";
import { getRecipes, getRecommendedRecipes } from "../../api/recipe";

const useRecommendedRecipes = ()=>{
    const { isAuthenticated } = useAuth();
    const { data: recipes = [] } = useQuery('recipes', ()=>{
        if(isAuthenticated){
            return getRecommendedRecipes().then(res=>res.data)
        }
        else {
            return getRecipes().then(res=>res.data);
        }
    })
    const recipeOrder = (a,b)=>a.rating===b.rating?b.reviews.length-a.reviews.length:b.rating-a.rating
    return recipes.sort(recipeOrder);
}

export default useRecommendedRecipes;