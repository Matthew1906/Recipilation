import { useEffect, useState } from "react";
import { getCookbooks } from "../../api/cookbook";

const useCookbooks = ()=>{
    const [ cookbooks, setCookbooks ] = useState([]);
    useEffect(()=>{
        getCookbooks().then(res=>setCookbooks(res.data));
    }, [])
    return cookbooks;
}

export default useCookbooks;