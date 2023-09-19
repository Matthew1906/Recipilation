import axiosClient from "./base";
import axiosUserClient from "./baseUser";

// Create Recipes (C)
export function getRecipeDraft(){
    return axiosUserClient.get('/api/recipes/new');
}

export function saveRecipe(type, data){
    return axiosUserClient.post(`/api/recipes/new/${type}`, data)
}

// Get Recipes (R)
export function getRecipe(slug){
    return axiosClient.get(`/api/recipes/${slug}`);
}

export function getRecipes(){
    return axiosClient.get("/api/recipes");
}

export function getRecentlyViewedRecipes(){
    return axiosUserClient.get("/api/recipes/recent");
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

export function searchRecipes(query){
    return axiosClient.get(`/api/recipes?query=${query}`);
}

// Edit Recipes (U)
export function getOnEditRecipes(){
    return axiosUserClient.get(`/api/recipes/edit`)
}

export function editRecipe(slug){
    return axiosUserClient.get(`/api/recipes/${slug}/edit`);
}

export function updateRecipe(slug, type, data){
    return axiosUserClient.put(`/api/recipes/${slug}/edit/${type}`, data)
}

// Delete Recipes (D)
export function deleteRecipe(slug){
    return axiosUserClient.delete(`/api/recipes/${slug}`);
}