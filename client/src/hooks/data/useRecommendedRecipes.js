import { useEffect, useState } from "react";
import { useAuth } from "../utils";
import { getRecipes, getRecommendedRecipes } from "../../api/recipe";

const useRecommendedRecipes = ()=>{
    const { isAuthenticated } = useAuth();
    const [recipes, setRecipes] = useState([]);
    useEffect(()=>{
        if(isAuthenticated){
            getRecommendedRecipes().then(res=>setRecipes(res.data));
        } else {
            getRecipes().then(res=>setRecipes(res.data));
        }
      }, [isAuthenticated])
    const recipeOrder = (a,b)=>a.rating===b.rating?b.reviews.length-a.reviews.length:b.rating-a.rating
    return recipes.sort(recipeOrder);
}

export default useRecommendedRecipes;