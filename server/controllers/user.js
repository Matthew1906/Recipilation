import slugify from "slugify";
import { Recipe, Review, User } from "../models/index.js";
import firebaseAdmin from "../services/firebase.js";
import { mean } from "../utils.js";

export const authenticateUser = async(req, res)=>{
    const { email, username, password=null, type } = req.body;
    try{
        if(type=='oauth'){
        const firebaseUser = await firebaseAdmin.auth.getUserByEmail(email);
        const newUser = new User({username, email, firebaseId:firebaseUser.uid, slug:slugify(username)});
        const checkUser = await User.find({email});
        if(checkUser.length == 0){
            newUser.save();
        }
            return res.status(200).json({ success: "Account created successfully. Please sign in." });
        }
        else{
        if (!email || !username || !password) {
            return res.status(400).json({ error:"Invalid request body. Must contain email, password, and username." });
        }
        const newFirebaseUser = await firebaseAdmin.auth.createUser({ email, password });
        if (newFirebaseUser) {
            const newUser = new User({username, email, firebaseId:newFirebaseUser.uid});
            newUser.save();
        }
            return res.status(200).json({ success: "Account created successfully. Please sign in." });
        }
    } catch (err) {
        if (err.code === "auth/email-already-exists") {
            return res.status(400).json({ error: "User account already exists at email address." });
        }
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getAverageUserRating = async(req, res, next)=>{
    try {
        const recipes = await Recipe.find({user:res.user._id}, "_id reviews").
            populate({path:'reviews', model:Review, select:'rating -_id'});
        res.user = {
            ...res.user._doc, 
            rating:mean(recipes.map(recipe=>mean(recipe.reviews.map(review=>review.rating)))),
        }
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getUser = async(req, res, next)=>{
    try{
        const user = await User.findOne({slug:req.params.slug}, 'username slug email image dob following')
        res.user = user;
        next()
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getUsers = async(req, res, next)=>{
    try{ 
        const users = await User.find({}, 'username slug image');
        res.users = users;
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const searchUsers = async(req, res, next)=>{
    try{ 
        const query = req.query.query ?? null;
        if (query!== null){
            res.users = res.users.filter(user=>user.username.toLowerCase().includes(query.toLowerCase()));
        }
        next()
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getUserDetails = async(req, res, next)=>{
    Promise.all(res.users.map(async user=>{
        const recipes = await Recipe.find({user:user._id}, "_id reviews").
            populate({path:'reviews', model:Review, select:'rating -_id'});
        const reviews = await Review.find({user:user._id}, "_id");
        return {
            ...user._doc, 
            rating:mean(recipes.map(recipe=>mean(recipe.reviews.map(review=>review.rating)))),
            recipes:recipes.length,
            reviews:reviews.length,
        }
    })).then(users=>{
        res.users = users
        next() 
    }).catch(err=>{
        return res.status(500).json({ error: "Server error. Please try again" });
    });
}