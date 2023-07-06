import express from "express";
import slugify from "slugify";
import { RecipeCategory, Recipe, User, RecipeEquipment, RecipeStep } from '../models/index.js';

const router = express.Router();

router.get('/', async(req, res)=>{
    const category = req.query.category ?? null;
    const user = req.query.user ?? null;
    const recipes = await Recipe.find({}, 'name slug user description categories image serving_size difficulty cooking_time preparation_time').
        populate({path:'categories', model:RecipeCategory, select:'slug -_id'}).
        populate({path:'user', model:User, select:'username slug _id'});
    if(category!==null){
        // Get all recipes based on a category
        return res.json(recipes.filter(recipe=>recipe.categories.map(cat=>cat.slug).includes(category))) 
    }
    else if(user!==null){
        // Get all recipes created by the user
        return res.json(recipes.filter(recipe=>slugify(recipe.user.username).toLowerCase()===user)) 
    }
    else{
        // Get all recipes
        return res.json(recipes);    
    }
});

router.get('/:id', async(req, res)=>{
    const slug = req.params.id;
    const recipe = await Recipe.findOne({slug}).
        populate({path:'categories', model:RecipeCategory, select:'name -_id'}).
        populate({path:'equipments', model:RecipeEquipment, select:'name image -_id'}).
        populate({path:'steps', model:RecipeStep, select:'-__v -recipe'}).
        populate({path:'user', model:User, select:'username slug _id'});
    return res.json(recipe);
});

export default router;