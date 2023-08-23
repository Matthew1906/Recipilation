import axiosClient from "./base";

export function deleteReview(slug, user){
    return axiosClient.delete(`/api/reviews/${slug}?user=${user}`);
}

export function getReview(slug, user){
    return axiosClient.get(`/api/reviews/${slug}?user=${user}`);
}

export function submitReview(data, slug, user){
    return axiosClient.post(`/api/reviews/${slug}`, {...data, user});
}

export function updateReview(data, slug, user){
    return axiosClient.put(`/api/reviews/${slug}`, {...data, user});
}