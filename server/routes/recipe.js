import express from "express";
import { getRecipe, getRecipes, filterCategories, filterByUser, sortByRatings } from "../controllers/recipe.js";

const router = express.Router();

router.get('/', 
    getRecipes, 
    filterCategories, 
    filterByUser, 
    sortByRatings,
    async(req, res)=>(res.json(res.recipes))
);

router.get('/:id', 
    getRecipe, 
    async(req, res)=>(res.json(res.recipe))
);

export default router;