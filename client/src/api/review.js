import axiosUserClient from "./baseUser";

export function deleteReview(slug){
    return axiosUserClient.delete(`/api/reviews/${slug}`);
}

export function getReview(slug){
    return axiosUserClient.get(`/api/reviews/${slug}`);
}

export function submitReview(data, slug){
    return axiosUserClient.post(`/api/reviews/${slug}`, data);
}

export function updateReview(data, slug, user){
    return axiosUserClient.put(`/api/reviews/${slug}`, {...data, user});
}