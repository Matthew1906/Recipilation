import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  // Initialize state
  const [ categories, setCategories ] = useState([]);
  const [ similarRecipes, setSimilarRecipes ] = useState([]);
  const [ recipesByChef, setRecipesByChef ] = useState([]);
  const [ validReviewer, setValidReviewer ] = useState(false);
  // Fetch recipe data
  const { data: recipe = {} } = useQuery(
    ['recipe', slug], ()=>getRecipe(slug).then(res=>res.data), 
    { onSuccess: (data)=>{
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
  // Mutations
  const queryClient = useQueryClient();
  const { mutate: showEditRecipe } = useMutation(()=>editRecipe(slug), {
    onSuccess:()=>navigate(`/recipes/${slug}/edit`)
  });
  const { mutate: removeRecipe } = useMutation(()=>deleteRecipe(slug), {
    onSuccess:()=>navigate(`/`)
  });
  const { mutate: removeReview } = useMutation(()=>deleteReview(slug), {
    onSuccess:()=>queryClient.invalidateQueries(['recipe', slug])
  });
  return {
    categories, recipe, 
    updateRecipe: showEditRecipe, 
    deleteRecipe: removeRecipe,
    similarRecipes, recipesByChef,
    validReviewer,
    updateReview:()=>setValidReviewer(true), 
    deleteReview:removeReview
  }
}

export default useSingleRecipe;
