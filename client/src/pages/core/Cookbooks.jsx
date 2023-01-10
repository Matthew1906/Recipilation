import CollectionsLayout from "../../layouts/CollectionsLayout";
import { categories } from "../../utils/data";

const Cookbooks = ()=>{
    return (
        <CollectionsLayout 
            heading="Cookbooks"
            subheading="Check out your collection of saved recipes!"
            items={[...categories, ...categories.slice(2,4)]}
            cookbook={true}
        />
    )
};

export default Cookbooks;