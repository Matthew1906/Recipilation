import axiosClient from "./base";

export function searchUsers(query){
    return axiosClient.get(`/api/users?query=${query}`);
}

export function getUser(slug){
    return axiosClient.get(`/api/users/${slug}`);
}