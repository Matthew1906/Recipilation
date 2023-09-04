import slugify from "slugify";
import mongoose from "mongoose";
import { RecipeCategory, Recipe, User, RecipeEquipment, RecipeStep, Review } from '../models/index.js';
import { mean } from "../utils.js";
import { uploadImage } from "../services/imagekit.js";

export const getRecipe = async(req, res, next)=>{
    try{
        const slug = req.params.id;
        const recipe = await Recipe.findOne({slug}).
            populate({path:'categories', model:RecipeCategory, select:'name slug -_id'}).
            populate({path:'equipments', model:RecipeEquipment, select:'name image -_id'}).
            populate({path:'reviews', model:Review, populate:{path:'user', select:'username slug email'}}).
            populate({path:'steps', model:RecipeStep, select:'-__v -recipe'}).
            populate({path:'user', model:User, select:'username slug email _id'});
        const avg_rating = mean(recipe['reviews'].map(review=>review.rating))
        res.recipe = {...recipe._doc, avg_rating};
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getRecipes = async(req, res, next)=>{
    try{
        const recipes = await Recipe.find({status:1}, 'status name slug user description categories image serving_size difficulty cooking_time preparation_time reviews').
            populate({path:'categories', model:RecipeCategory, select:'slug -_id'}).
            populate({path:'reviews', model:Review, select:'rating -_id'}).
            populate({path:'user', model:User, select:'username slug email _id'});
        res.recipes = recipes;
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const filterCategories = async(req, res, next)=>{
    try{
        const category = req.query.category ?? null;
        if(category!==null){
            // Get all recipes based on a category
            let categories = category.split(";");
            let intersectCategories = (rCats, qCats)=>{
                return rCats.filter(cat=>qCats.includes(cat)).length>0;
            }
            res.recipes = res.recipes.filter(
                recipe=>intersectCategories(
                    recipe.categories.map(category=>category.slug), 
                    categories
                )
            ) 
        }
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
};

export const filterByUser = async(req, res, next)=>{
    try{
        const user = res.user ? res.user.slug : req.query.user ?? null;
        if(user !== null){
            res.recipes = res.recipes.filter(recipe=>slugify(recipe.user.username).toLowerCase()===user); 
        }
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const searchRecipes = async(req, res, next)=>{
    try {
        const query = req.query.query ?? null;
        if (query!== null){
            res.recipes = res.recipes.filter(recipe=>recipe.name.toLowerCase().includes(query.toLowerCase()));
        }
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const sortByRatings = async(req, res, next)=>{
    try{
        res.recipes = res.recipes.map(recipe=>{
            const rating = mean(recipe['reviews'].map(review=>review.rating))
            return {
                ...recipe._doc, rating
            }
        }).sort((a,b)=>a.rating-b.rating);
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getRecipeDraft = async(req, res, next)=>{
    try{
        const recipe = await Recipe.findOne({user:req.user, status:0}).
            populate({path:'categories', model:RecipeCategory, select:'name slug -_id'}).
            populate({path:'equipments', model:RecipeEquipment }).
            populate({path:'steps', model:RecipeStep, select:'-__v -recipe'}).
            populate({path:'user', model:User, select:'username slug email _id'});
        if(!recipe){
            res.recipe = null;
        }
        else{
            res.recipe = recipe;
        }
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const saveRecipe = async(req, res, next)=>{
    try{
        switch(req.params.type){
            case "information":
                const { name, description, difficulty, servingSize, image, cookingTime, preparationTime, categories } = req.body
                const {imageId, image:imageResult} = await uploadImage(image, `${slugify(name.toLowerCase())}.jpg`, 'recipes')
                const recipe_categories = await Promise.all(
                    categories.map(async(name, theme)=>{
                        const item = await RecipeCategory.findOne({name});
                        return item._id;
                    })
                );
                if(res.recipe===null){
                    const recipe = new Recipe({ 
                        name, description, difficulty, 
                        slug: slugify(name.toLowerCase()),
                        imageId, image:imageResult,
                        user:req.user, serving_size: servingSize,
                        categories:recipe_categories,
                        cooking_time: `${cookingTime.amount} ${cookingTime.type}`,
                        preparation_time: `${preparationTime.amount} ${preparationTime.type}`
                    });
                    recipe.save()
                    res.recipe = recipe;
                } else{
                    await Recipe.findOneAndUpdate({_id:res.recipe._id}, {
                        name, description, difficulty, 
                        slug: slugify(name.toLowerCase()),
                        imageId, image:imageResult,
                        user:req.user, serving_size: servingSize,
                        categories:recipe_categories,
                        cooking_time: `${cookingTime.amount} ${cookingTime.type}`,
                        preparation_time: `${preparationTime.amount} ${preparationTime.type}`
                    })
                    const recipe = await Recipe.findOne({_id:res.recipe._id})
                    res.recipe = recipe;
                }
                break;
            case "material":
                if(res.recipe!==null){
                    const { equipments, ingredients} = req.body;
                    await Recipe.findOneAndUpdate({_id:res.recipe._id}, {
                        equipments:equipments.map(equipment=>new mongoose.Types.ObjectId(equipment)),
                        ingredients
                    });
                    const recipe = await Recipe.findOne({_id:res.recipe._id})
                    res.recipe = recipe;
                }
                break;
            case "tutorial":
                if(res.recipe!==null){
                    const {index, title, details, image} = req.body;
                    if(image!==null){
                        const {imageId, image:imageResult} = await uploadImage(image, `${res.recipe.slug}-${index}.webp`, 'steps')
                        const newStep = new RecipeStep({recipe:res.recipe.slug, index, title, details, image:imageResult, imageId});
                        const prevStep = res.recipe.steps.filter(step=>step.index===index);
                        if(prevStep.length>0){
                            await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$pull:{steps:prevStep[0]._id}});
                            await RecipeStep.deleteOne({_id:prevStep[0]._id});
                        }
                        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$push:{steps:newStep}})
                        newStep.save();
                    }
                    else{
                        const newStep = new RecipeStep({recipe:res.recipe.slug, index, title, details})
                        const prevStep = res.recipe.steps.filter(step=>step.index===index);
                        if(prevStep.length>0){
                            await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$pull:{steps:prevStep[0]._id}});
                            await RecipeStep.deleteOne({_id:prevStep[0]._id});
                        }
                        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {$push:{steps:newStep}})
                        newStep.save();
                    }
                }
                break;
            case "final":
                await Recipe.findOneAndUpdate({_id:res.recipe._id}, {status:1});
                const recipe = await Recipe.findOne({_id:res.recipe._id});
                res.recipe = recipe;
                break;
        }
        next();
    } catch(err){
        console.log(err);
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const editRecipe = async(req, res, next)=>{
    try{
        await Recipe.findOneAndUpdate({_id:res.recipe._id}, {status:2});
        next();
    } catch(err){
        console.log(err);
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getOnEditRecipes = async(req, res, next)=>{
    try{
        const user = res.user ? res.user.slug : req.query.user ?? null
        const recipes = await Recipe.find({status:2}, 'name status slug user description categories image serving_size difficulty cooking_time preparation_time reviews').
            populate({path:'categories', model:RecipeCategory, select:'slug -_id'}).
            populate({path:'reviews', model:Review, select:'rating -_id'}).
            populate({path:'user', model:User, select:'username slug email _id'});
        res.onEdit = recipes.filter(recipe=>slugify(recipe.user.username).toLowerCase()===user);
        next();
    } catch(err){
        console.log(err)
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const deleteRecipe = async(req, res, next)=>{
    try{
        await RecipeStep.deleteMany({recipe:res.recipe.slug});
        res.recipe.reviews.forEach(async review=>{
            await Review.findOneAndDelete({_id:review._id});
        });
        await Recipe.deleteOne({_id:res.recipe._id});
        next()
    } catch(err){
        console.log(err);
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}