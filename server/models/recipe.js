import { model, Schema } from "mongoose";

const recipeSchema = Schema({
    name:{type:String, required:true},
    user:{type:Schema.Types.ObjectId, ref:'user'},
    description:{type:String, required:true},
    categories:[{type:Schema.Types.ObjectId, ref:'category'}],
    image:{type:String, required:true},
    serving_size:{type:Number, required:true},
    difficulty:{type:String, required:true},
    cooking_time:{type:String, required:true},
    preparation_time:{type:String, required:true},
    ingredients:[{type:String}],
    equipments:[{type:Schema.Types.ObjectId, ref:'equipment'}],
    steps:[{type:Schema.Types.ObjectId, ref:'step'}],
    reviews:[{type:Schema.Types.ObjectId, ref:'review'}]
});

const Recipe = model('recipe', recipeSchema);

export default Recipe;