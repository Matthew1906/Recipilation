import axiosClient from "./base";

export function submitReview(data, slug, user){
    return axiosClient.post(`/api/reviews/${slug}`, {...data, user});
}