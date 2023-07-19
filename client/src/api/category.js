import axiosClient from "./base";

export function getCategories(){
    return axiosClient.get("/api/categories");
}

export function searchCategories(query){
    return axiosClient.get(`/api/categories?query=${query}`);
}