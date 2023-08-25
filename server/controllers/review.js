import { User, Review, Recipe } from "../models/index.js";

export const addReview = async(req, res, next)=>{
    try{
        const user = await User.findOne({slug:req.body.user});
        const review = new Review({
            user: user._id,
            body: req.body.body,
            difficulty:req.body.difficulty,
            rating: req.body.rating,
            date:Date.now()
        });
        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$push:{reviews:review._id}});
        review.save();
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const deleteReview = async(req, res, next)=>{
    try{
        const user = await User.findOne({slug:req.query.user});
        const review = res.recipe['reviews'].filter(review=>review.user.equals(user._id))[0]
        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$pull:{reviews:review._id}});
        await Review.findOneAndDelete({_id:review._id});
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getReview = async(req, res, next)=>{
    try{
        const user = await User.findOne({slug:req.query.user});
        const review = res.recipe['reviews'].filter(review=>review.user.equals(user._id));
        if(review.length>0){
            res.review = review[0];
        }else{
            res.review = null;
        }
        next();
    } catch(err){
        console.log(err);
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const updateReview = async(req, res, next)=>{
    try{
        const user = await User.findOne({slug:req.body.user});
        const review = new Review({
            user: user._id,
            body: req.body.body,
            difficulty:req.body.difficulty,
            rating: req.body.rating,
            date:Date.now()
        });
        const prevReview = res.recipe['reviews'].filter(review=>review.user.equals(user._id))[0]
        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$pull:{reviews:prevReview._id}});
        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$push:{reviews:review._id}});
        await Review.findOneAndDelete({_id:prevReview._id});
        review.save();
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}