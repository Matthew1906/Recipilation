import { model, Schema } from "mongoose";

const stepSchema = Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    image: {type:String, required:true}
})

const RecipeStep = model('step', stepSchema);

export default RecipeStep;