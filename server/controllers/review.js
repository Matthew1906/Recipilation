import { User, Review, Recipe } from "../models/index.js";

export const addReview = async(req, res, next)=>{
    try{
        const user = await User.findOne({email:req.body.user});
        const review = new Review({
            user: user._id,
            body: req.body.body,
            difficulty:req.body.difficulty,
            rating: req.body.rating
        });
        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$push:{reviews:review._id}});
        review.save();
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}
