import { CollectionsLayout } from "../../layouts";
import { useCategories } from "../../hooks";

const Categories = () => {
    const categories = useCategories();
    return(
        <CollectionsLayout 
            heading="Categories" 
            subheading="Check out your categories of our recipes!" 
            items={categories}
        />
    )
};

export default Categories;