import CollectionsLayout from "../../layouts/CollectionsLayout";
import { categories } from "../../utils/data";

const Categories = ()=> (
    <CollectionsLayout 
        heading="Categories" 
        subheading="Check out your categories of our recipes!" 
        items={[...categories, ...categories.slice(2,4)]}
    />
);

export default Categories;