import { useEffect, useState } from "react";
import { searchCategories } from "../../api/category";
import { searchRecipes } from "../../api/recipe";
import { searchUsers } from "../../api/user";

const useSearch = ()=>{
    const [ query, setQuery ] = useState("");
    const [ recipes, setRecipes ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ profiles, setProfiles ] = useState([]);
    const searchQuery = (res) => setQuery(res.query);
    useEffect(()=>{
      searchCategories(query).then(res=>setCategories(res.data));
      searchRecipes(query).then(res=>setRecipes(res.data));
      searchUsers(query).then(res=>setProfiles(res.data));
    }, [query]);
    return {
        query, searchQuery,
        categories, profiles, recipes
    }
}

export default useSearch;