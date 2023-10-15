import { useEffect, useState } from "react";
import { getRecipesByCategories } from "../../api/recipe";

const useSingleCategory = (slug)=>{
  const [ recipes, setRecipes ] = useState([]);
  useEffect(()=>{
    getRecipesByCategories(slug).then(res=>{
      setRecipes(res.data);
    })
  }, [slug]);
  return recipes;
}

export default useSingleCategory;