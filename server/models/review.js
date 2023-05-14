import { model, Schema } from "mongoose";

const reviewSchema = Schema({
    user: {type:Schema.Types.ObjectId, ref:'user'},
    body: {type:String, required:true},
    date: {type:Date, required:true, default:Date.now},
    rating: {type:Number, required:true}
})

const Review = model('review', reviewSchema);

export default Review;