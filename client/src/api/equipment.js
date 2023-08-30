import axiosUserClient from "./baseUser"

export function addEquipment(equipment){
    return axiosUserClient.post("/api/equipments", equipment);
}

export function getEquipments(){
    return axiosUserClient.get("/api/equipments");
}

export function searchEquipments(query){
    return axiosUserClient.get(`/api/equipments?query=${query}`);
}
