import { CollectionsLayout } from "../../layouts";
import { useCookbooks } from "../../hooks";

const Cookbooks = () => {
    const cookbooks = useCookbooks();
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