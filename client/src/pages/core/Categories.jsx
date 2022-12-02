import CollectionsLayout from "../../layouts/CollectionsLayout";
import { categories } from "../data";

const Categories = ()=>{
    return (
        <CollectionsLayout 
            heading="Categories"
            subheading="Check out your categories of our recipes!"
            items={[...categories, ...categories.slice(2,4)]}
        />
    )
};

export default Categories;