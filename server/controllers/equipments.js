import slugify from "slugify";
import { RecipeEquipment } from "../models/index.js";
import { uploadImage } from "../services/imagekit.js";

export const getEquipments = async (req, res, next)=>{
    try{
        const equipments = await RecipeEquipment.find({});
        res.equipments = equipments;
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const addEquipment = async (req, res, next)=>{
    try{
        // Add new equipment
        const {name, image} = req.body;
        const {imageId, image:imageResult} = await uploadImage(image, `${slugify(name.toLowerCase())}.jpg`, 'equipments')
        const new_equipment = new RecipeEquipment({
            name, slug:slugify(name.toLowerCase()), 
            image:imageResult, imageId
        })
        new_equipment.save();
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const searchEquipments = async (req, res, next)=>{
    try{
        const query = req.query.query ?? null;
        if (query!== null){
            res.equipments = res.equipments.filter(equipment=>equipment.name.toLowerCase().includes(query.toLowerCase()));
        }
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}