import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { deleteCookbook, getRecipesByCookbook } from "../../api/cookbook";

const useSingleCookbook = (slug)=>{
  const { data: recipes = [] } = useQuery(
    ['cookbook', slug], ()=>getRecipesByCookbook(slug).then(res=>res.data)
  );
  const navigate = useNavigate();
  const removeCookbook = ()=>{
    deleteCookbook(slug)
    navigate("/cookbooks");
  }
  return { recipes, removeCookbook }
}

export default useSingleCookbook;