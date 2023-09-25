import axiosUserClient from "./baseUser";

export const getCookbooks = ()=>{
    return axiosUserClient.get("/api/cookbooks")
}

export const getRecipesByCookbook = (slug)=>{
    return axiosUserClient.get(`/api/cookbooks/${slug}`);
}