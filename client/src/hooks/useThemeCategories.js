import { categoryConfig } from "../utils/theme";

const randomizeTheme = () => categoryConfig[Object.keys(categoryConfig)[Math.floor(Math.random() * Object.keys(categoryConfig).length)]];

const useThemeCategories = (categories)=>{
    return categories.map((category) => ({
        name: category,
        theme: randomizeTheme(),
    }));
}

export default useThemeCategories;