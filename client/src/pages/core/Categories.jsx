import { useState, useEffect } from "react";
import { getCategories } from "../../api/category";
import { CollectionsLayout } from "../../layouts";

const Categories = () => {
    const [ categories, setCategories ] = useState([]);
    useEffect(()=>{
        getCategories().then(res=>setCategories(res.data));
    }, [])
    return(
    <CollectionsLayout 
        heading="Categories" 
        subheading="Check out your categories of our recipes!" 
        items={categories}
    />)
};

export default Categories;