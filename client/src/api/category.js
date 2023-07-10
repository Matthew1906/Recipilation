import axiosClient from "./base";

export function getCategories(){
    return axiosClient.get("/api/categories");
}