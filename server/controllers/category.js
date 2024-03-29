import { RecipeCategory } from "../models/index.js";
import { mean } from "../utils.js";

export const getCategories = async(req, res, next)=>{
    try{
        const categories = await RecipeCategory.find({});
        req.categories = categories;
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getCategoryDetails = async(req, res, next)=>{
    Promise.all(req.categories.map(async(category)=>{
        const filtered = res.recipes.filter(recipe=>recipe.categories.map(category=>category.slug).includes(category.slug));
        const avgRatings = filtered.map(recipe=>mean(recipe['reviews'].map(review=>review.rating)));
        return({
            name: category.name,
            slug: category.slug,
            avgRating: mean(avgRatings),
            numRecipes: filtered.length,
            images: filtered.map(recipe=>recipe.image).slice(0,4)
        })
    })).then((categories)=>{
        res.categories = categories.sort((a,b)=>a.avgRating-b.avgRating||b.numRecipes-a.numRecipes);
    }).catch((err)=>{
        return res.status(500).json({ error: "Server error. Please try again" });
    }).finally(()=>{
        next();
    })
}

export const searchCategories = async(req, res, next)=>{
    try{
        const query = req.query.query ?? null;
        if (query!== null){
            req.categories = req.categories.filter(category=>category.name.toLowerCase().includes(query.toLowerCase()));
        }
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}