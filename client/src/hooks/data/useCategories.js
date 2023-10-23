import { useQuery } from "react-query";
import { getCategories } from "../../api/category";

const useCategories = ()=>{
    const { data:categories = [] } = useQuery("categories", ()=>getCategories().then(res=>res.data));
    const categoryOrder = (a,b)=>a.avgRating-b.avgRating||b.numRecipes-a.numRecipes;
    return categories.sort(categoryOrder);
}

export default useCategories;