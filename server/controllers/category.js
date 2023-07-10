import { RecipeCategory } from "../models/index.js";
import { mean } from "../utils.js";

export const getCategories = async(req, res, next)=>{
    const categories = await RecipeCategory.find({});
    req.categories = categories;
    next();
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
    }).finally(()=>{
        next();
    })
}