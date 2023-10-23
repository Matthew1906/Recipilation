import { useQuery } from "react-query";
import { getCookbooks } from "../../api/cookbook";

const useCookbooks = ()=>{
    const { data: cookbooks = [] } = useQuery('cookbooks', ()=>getCookbooks().then(res=>res.data));
    return cookbooks;
}

export default useCookbooks;