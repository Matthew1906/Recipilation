import { useQuery } from "react-query";
import { getRecipesByCategories } from "../../api/recipe";

const useSingleCategory = (slug)=>{
  const { data: recipes = [] } = useQuery(
    ['category', slug], ()=>getRecipesByCategories(slug).then(res=>res.data)
  );
  return recipes;
}

export default useSingleCategory;