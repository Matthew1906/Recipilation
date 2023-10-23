import { useQuery } from "react-query";
import { getRecentlyViewedRecipes } from "../../api/recipe";

const useHistory = ()=>{
    const history = sessionStorage.getItem("history");
    const { data: recentlyViewed = [] } = useQuery(
        ['history', history], 
        ()=>getRecentlyViewedRecipes(history!==null?history:"").then(res=>res.data)
    )
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