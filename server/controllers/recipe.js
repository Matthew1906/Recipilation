import slugify from "slugify";
import { RecipeCategory, Recipe, User, RecipeEquipment, RecipeStep, Review } from '../models/index.js';
import { mean } from "../utils.js";

export const getRecipe = async(req, res, next)=>{
    const slug = req.params.id;
    const recipe = await Recipe.findOne({slug}).
        populate({path:'categories', model:RecipeCategory, select:'name slug -_id'}).
        populate({path:'equipments', model:RecipeEquipment, select:'name image -_id'}).
        populate({path:'reviews', model:Review, select:'user body date rating -_id', populate:{path:'user', select:'username slug'}}).
        populate({path:'steps', model:RecipeStep, select:'-__v -recipe'}).
        populate({path:'user', model:User, select:'username slug _id'});
    const avg_rating = mean(recipe['reviews'].map(review=>review.rating))
    res.recipe = {...recipe._doc, avg_rating};
    next();
}

export const getRecipes = async(req, res, next)=>{
    const recipes = await Recipe.find({}, 'name slug user description categories image serving_size difficulty cooking_time preparation_time reviews').
        populate({path:'categories', model:RecipeCategory, select:'slug -_id'}).
        populate({path:'reviews', model:Review, select:'rating -_id'}).
        populate({path:'user', model:User, select:'username slug _id'});
    res.recipes = recipes;
    next();
}

export const filterCategories = async(req, res, next)=>{
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
};

export const filterByUser = async(req, res, next)=>{
    const user = req.query.user ?? null;
    if(user !== null){
        res.recipes = res.recipes.filter(recipe=>slugify(recipe.user.username).toLowerCase()===user); 
    }
    next();
}

export const sortByRatings = async(req, res, next)=>{
    res.recipes = res.recipes.map(recipe=>{
        const rating = mean(recipe['reviews'].map(review=>review.rating))
        return {
            ...recipe._doc, rating
        }
    }).sort((a,b)=>a.rating-b.rating);
    next();
}