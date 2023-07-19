import express from "express";
import { 
    getRecipe, getRecipes, 
    filterCategories, filterByUser, 
    searchRecipes, sortByRatings
} from "../controllers/recipe.js";

const router = express.Router();

router.get('/', 
    getRecipes, 
    filterCategories, 
    filterByUser, 
    searchRecipes,
    sortByRatings,
    async(req, res)=>(res.json(res.recipes))
);

router.get('/:id', 
    getRecipe, 
    async(req, res)=>(res.json(res.recipe))
);

export default router;