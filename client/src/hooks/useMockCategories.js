import { categoryConfig } from "../utils/theme";

const randomizeTheme = () => categoryConfig[Object.keys(categoryConfig)[Math.floor(Math.random() * Object.keys(categoryConfig).length)]];

const useMockCategories = ()=>{
    const categories = ["Lunch", "Dinner", "Western", "Pasta", "Meat"].map((category) => ({
        name: category,
        theme: randomizeTheme(),
    }));
    return categories;
}

export default useMockCategories;