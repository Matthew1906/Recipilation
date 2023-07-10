import axiosClient from "./base";

export function getRecipe(slug){
    return axiosClient.get(`/api/recipes/${slug}`);
}

export function getRecipes(){
    return axiosClient.get("/api/recipes");
}

export function getRecipesByCategories(categories){
    if(typeof(categories)==='string'){
        return axiosClient.get(`/api/recipes?category=${categories}`);
    }
    return axiosClient.get(`/api/recipes?category=${categories.join(";")}`);
}

export function getRecipesByCreator(chef){
    return axiosClient.get(`/api/recipes?user=${chef}`);
}
