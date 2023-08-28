import express from "express";
import validateUser from "../middlewares/auth.js";
import { 
    getRecipe, getRecipes, 
    filterCategories, filterByUser, 
    searchRecipes, sortByRatings, getRecipeDraft
} from "../controllers/recipe.js";

const router = express.Router();

// Add Recipes

router.get('/new', validateUser, getRecipeDraft, async(req, res)=>res.json(res.recipe));

// router.post("/new",);


// Get Recipes

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