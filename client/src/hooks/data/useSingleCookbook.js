import { useEffect, useState } from "react";
import { deleteCookbook, deleteRecipeFromCookbook, getRecipesByCookbook } from "../../api/cookbook";
import { useNavigate } from "react-router";

const useSingleCookbook = (slug)=>{
  const [ recipes, setRecipes ] = useState([]);
  useEffect(()=>{
    getRecipesByCookbook(slug).then(res=>{
      setRecipes(res.data);
    })
  }, [slug]);
  const navigate = useNavigate();
  const removeCookbook = ()=>{
    deleteCookbook(slug)
    navigate("/cookbooks");
  }
  const removeFromCookbook = (slug)=>{
    deleteRecipeFromCookbook(cookbook, {recipe:slug})
    window.location.reload();
  }
  return { recipes, removeCookbook, removeFromCookbook }
}

export default useSingleCookbook;