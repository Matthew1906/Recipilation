import { useState, useEffect } from "react";
import { getCookbooks } from "../../api/cookbook";
import { CollectionsLayout } from "../../layouts";

const Cookbooks = () => {
    const [ cookbooks, setCookbooks ] = useState([]);
    useEffect(()=>{
        getCookbooks().then(res=>setCookbooks(res.data));
    }, [])
    return(
        <CollectionsLayout 
            heading="My Cookbooks" 
            subheading="Check out your cookbooks of our recipes!" 
            items={cookbooks}
            cookbook
        />
    )
};

export default Cookbooks;