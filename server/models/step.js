import { model, Schema } from "mongoose";

const stepSchema = Schema({
    index: {type:Number, required:true},
    recipe: {type:String, required:true},
    title: {type:String, required:true},
    details: {type:String, required:true},
    imageId: {type:String, trim:true},
    image: {type:String, trim:true}
});

const RecipeStep = model('step', stepSchema);

export default RecipeStep;