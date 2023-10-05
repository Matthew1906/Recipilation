import axiosUserClient from "./baseUser";

export const saveCookbook = (data)=>{
    return axiosUserClient.post("/api/cookbooks", data);
}

export const addRecipeToCookbook = (slug, recipe)=>{
    return axiosUserClient.put(`/api/cookbooks/${slug}`, recipe);
}

export const deleteRecipeFromCookbook = (slug, recipe)=>{
    return axiosUserClient.put(`/api/cookbooks/${slug}/delete`, recipe);   
}

export const getCookbooks = ()=>{
    return axiosUserClient.get("/api/cookbooks")
}

export const getRecipesByCookbook = (slug)=>{
    return axiosUserClient.get(`/api/cookbooks/${slug}`);
}

export const searchCookbooks = (query)=>{
   return axiosUserClient.get(`/api/cookbooks?query=${query}`);
}

export const deleteCookbook = (slug)=>{
    return axiosUserClient.delete(`/api/cookbooks/${slug}`);
}