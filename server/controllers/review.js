import { Review, Recipe } from "../models/index.js";

export const addReview = async(req, res, next)=>{
    try{
        const review = new Review({
            user: req.user._id,
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
        const reviews = res.recipe['reviews'].filter(review=>review.user.slug===req.user.slug)[0]
        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$pull:{reviews:review._id}});
         await Review.findOneAndDelete({_id:review._id});
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getReview = async(req, res, next)=>{
    try{
        const review = res.recipe['reviews'].filter(review=>review.user.slug===req.user.slug);
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
        const review = new Review({
            user: req.user._id,
            body: req.body.body,
            difficulty:req.body.difficulty,
            rating: req.body.rating,
            date:Date.now()
        });
        const prevReview = res.recipe['reviews'].filter(review=>review.user.slug===req.user.slug)[0]
        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$pull:{reviews:prevReview._id}});
        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$push:{reviews:review._id}});
        await Review.findOneAndDelete({_id:prevReview._id});
        review.save();
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}