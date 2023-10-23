import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useAuth } from "../utils";
import { deleteRecipe, editRecipe, getRecipe, getRecipesByCategories, getRecipesByCreator } from "../../api/recipe";
import { deleteReview } from "../../api/review";
import { categoryConfig } from "../../utils/theme";

const randomizeTheme = () => categoryConfig[Object.keys(categoryConfig)[Math.floor(Math.random() * Object.keys(categoryConfig).length)]];

const useSingleRecipe = (slug)=>{
  // Utilities
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [ changes, setChanges ] = useState(false);
  const updatePage = ()=>setChanges(!changes);
  // Initialize state
  const [ categories, setCategories ] = useState([]);
  const [ similarRecipes, setSimilarRecipes ] = useState([]);
  const [ recipesByChef, setRecipesByChef ] = useState([]);
  const [ validReviewer, setValidReviewer ] = useState(false);
  // Fetch recipe data
  const { data: recipe = {} } = useQuery(
    ['recipe', slug], ()=>getRecipe(slug).then(res=>res.data), 
    { enabled: isAuthenticated,
      onSuccess: (data)=>{
        const { categories, user:creator, reviews } = data;
        setCategories(categories.map(category=>({
          name: category.name,
          theme: randomizeTheme(),
        })));
        if(isAuthenticated && creator?.email !== user?.email && !reviews.map(review=>review.user.email).includes(user?.email)){
          setValidReviewer(true);
        } else {
          setValidReviewer(false);
        }
        getRecipesByCategories(categories.map(category=>category.slug)).then(res=>setSimilarRecipes(res.data));
        getRecipesByCreator(creator?.slug).then(res=>setRecipesByChef(res.data));
      }
    }
  )
  return {
    categories, recipe, 
    updateRecipe:()=>editRecipe(recipe?.slug).then(navigate(`/recipes/${recipe?.slug}/edit`)), 
    deleteRecipe:()=>deleteRecipe(recipe?.slug).then(navigate('/')),
    refreshRecipe: updatePage,
    similarRecipes, recipesByChef,
    validReviewer,
    updateReview:()=>setValidReviewer(true), 
    deleteReview:()=>deleteReview(recipe?.slug).then(navigate(`/recipes/${recipe?.slug}`)),
  }
}

export default useSingleRecipe;