import axiosClient from "./base";

export function getRecipe(slug){
    return axiosClient.get(`/api/recipes/${slug}`);
}

export function getRecipesByCategories(categories){
    return axiosClient.get(`/api/recipes?category=${categories.join(";")}`);
}

export function getRecipesByCreator(chef){
    return axiosClient.get(`/api/recipes?user=${chef}`);
}
