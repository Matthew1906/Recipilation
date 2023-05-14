import { model, Schema } from "mongoose";

const categorySchema = Schema({
    name: {type:String, required:true},
    slug: {type:String, required:true},
})

const RecipeCategory = model('category', categorySchema);

export default RecipeCategory;