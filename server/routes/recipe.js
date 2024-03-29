import express from "express";
import { 
    getRecipe, getRecipes, 
    getRecentlyViewed, filterRecommendations,
    filterCategories, filterByUser, 
    searchRecipes, addRatings, getRecipeDraft,
    saveRecipe,
    editRecipe,
    deleteRecipe
} from "../controllers/recipe.js";
import validateUser from "../middlewares/auth.js";

const router = express.Router();

// Add Recipes
router.get('/new', validateUser, getRecipeDraft, async(req, res)=>res.json(res.recipe));
router.post("/new/:type", validateUser, getRecipeDraft, saveRecipe, async(req, res)=>res.json(res.recipe));

// Get Recipes
router.get('/', 
    getRecipes, 
    filterCategories, 
    filterByUser, 
    searchRecipes,
    addRatings,
    async(req, res)=>(res.json(res.recipes))
);

router.get('/recommendations', validateUser, getRecipes, filterRecommendations, addRatings, async(req, res)=>res.json(res.recipes));

router.get('/recent', getRecentlyViewed, async(req, res)=>res.json(res.recipes));

// Get Recipe
router.get('/:id', 
    getRecipe, 
    async(req, res)=>(res.json(res.recipe))
);


// Edit recipes
router.get('/:id/edit', validateUser, getRecipe, editRecipe);
router.put('/:id/edit/:type', validateUser, getRecipe, saveRecipe, async(req, res)=>(res.json(res.recipe)));

// Delete recipes
router.delete("/:id", validateUser, getRecipe, deleteRecipe);

export default router;