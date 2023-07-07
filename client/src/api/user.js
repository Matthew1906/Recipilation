import axiosClient from "./base";

export function getUser(slug){
    return axiosClient.get(`/api/users/${slug}`);
}