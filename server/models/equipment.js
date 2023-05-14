import { model, Schema } from "mongoose";

const equipmentSchema = Schema({
    title: {type:String, required:true},
    slug: {type:String, required:true},
    image: {type:String, required:true}
})

const RecipeEquipment = model('equipment', equipmentSchema);

export default RecipeEquipment;