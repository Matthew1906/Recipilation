import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../utils";
import { deleteRecipe, editRecipe, getRecipe, getRecipesByCategories, getRecipesByCreator } from "../../api/recipe";
import { deleteReview } from "../../api/review";
import { categoryConfig } from "../../utils/theme";

const randomizeTheme = () => categoryConfig[Object.keys(categoryConfig)[Math.floor(Math.random() * Object.keys(categoryConfig).length)]];

const useSingleRecipe = (slug)=>{
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [ changes, setChanges ] = useState(false);
  const updatePage = ()=>setChanges(!changes);
  const [ recipe, setRecipe ] = useState({});
  const [ categories, setCategories ] = useState([]);
  const [ similarRecipes, setSimilarRecipes ] = useState([]);
  const [ recipesByChef, setRecipesByChef ] = useState([]);
  const [ validReviewer, setValidReviewer ] = useState(false); 
  useEffect(()=>{
    getRecipe(slug).then(res=>{
      setRecipe(res.data);
      setCategories(res?.data?.categories.map(category=>({
        name: category.name,
        theme: randomizeTheme(),
      })));
      if(isAuthenticated && res?.data?.user?.email !== user?.email && !res?.data?.reviews.map(review=>review.user.email).includes(user?.email)){
        setValidReviewer(true);
      } else {
        setValidReviewer(false);
      }
      getRecipesByCategories(res?.data?.categories.map(category=>category.slug)).then(res=>setSimilarRecipes(res.data));
      getRecipesByCreator(res?.data?.user?.slug).then(res=>setRecipesByChef(res.data));
    }).catch(err=>console.log(err));
  }, [slug, isAuthenticated, user, changes]);
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