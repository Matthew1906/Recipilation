import { useEffect, useState } from "react";
import { getCategories } from "../../api/category";

const useCategories = ()=>{
    const [ categories, setCategories ] = useState([]);
    useEffect(()=>{
        getCategories().then(res=>setCategories(res.data));
    }, [])
    const categoryOrder = (a,b)=>a.avgRating-b.avgRating||b.numRecipes-a.numRecipes;
    return categories.sort(categoryOrder);
}

export default useCategories;