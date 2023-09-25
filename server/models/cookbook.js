import { model, Schema } from "mongoose";

const cookbookSchema = Schema({
    name: {type: String, required:true, trim:true},
    slug: {type: String, required:true, trim:true},
    user: {type:Schema.Types.ObjectId, ref:'user'},
    recipes: [{type:Schema.Types.ObjectId, ref:'recipe'}],
})

const Cookbook = model('cookbook', cookbookSchema);

export default Cookbook;