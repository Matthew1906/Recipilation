import axiosClient from "./base";
import axiosUserClient from "./baseUser";

export function searchUsers(query){
    return axiosClient.get(`/api/users?query=${query}`);
}

export function getUser(slug){
    return axiosClient.get(`/api/users/${slug}`);
}

export function updateUser(slug, data){
    return axiosClient.put(`/api/users/${slug}`, data);
}

export function followUser(slug){
    return axiosUserClient.put(`/api/users/follow/${slug}`);
}

export function unfollowUser(slug){
    return axiosUserClient.put(`/api/users/unfollow/${slug}`);
}
