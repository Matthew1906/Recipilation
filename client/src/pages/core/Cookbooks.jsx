import { CollectionsLayout } from "../../layouts";
import { categories } from "../../utils/data";

const Cookbooks = ()=>{
    return (
        <CollectionsLayout 
            heading="Cookbooks"
            subheading="Check out your collection of saved recipes!"
            items={[...categories, ...categories.slice(2,4)]}
            cookbook
        />
    )
};

export default Cookbooks;