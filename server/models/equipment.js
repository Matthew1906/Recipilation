import { model, Schema } from "mongoose";

const equipmentSchema = Schema({
    name: {type:String, required:true, unique:true},
    slug: {type:String, required:true},
    imageId: {type:String, required:true},
    image: {type:String, required:true}
})

const RecipeEquipment = model('equipment', equipmentSchema);

export default RecipeEquipment;