import { useEffect, useState } from "react";
import { getRecentlyViewedRecipes } from "../../api/recipe";

const useHistory = ()=>{
    const [ recentlyViewed, setRecentlyViewed ] = useState([]);
    useEffect(()=>{
      const history = sessionStorage.getItem("history");
      getRecentlyViewedRecipes(history!==null?history:"").then(res=>setRecentlyViewed(res.data));
    }, []);
    const saveHistory = (slug)=>{
        const recentlyViewed = sessionStorage.getItem("history");
        if(recentlyViewed===null){
        sessionStorage.setItem("history", slug);
        }
        else if(!recentlyViewed.includes(slug)){
        sessionStorage.setItem("history", recentlyViewed+ "_" + slug);
        }
    }
    return { 
        recentlyViewed, saveHistory
    };
}

export default useHistory;