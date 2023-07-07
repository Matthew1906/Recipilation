import axiosClient from "./base";

export function getRecipe(slug){
    return axiosClient.get(`/api/recipes/${slug}`)
}

export function getRecipesByCategory(category){
    return axiosClient.get(`/api/recipes?category=${category}`)
}

export function getRecipesByCreator(chef){
    return axiosClient.get(`/api/recipes?user=${chef}`)
}
