import express from "express";
import { getCategories, getCategoryDetails } from "../controllers/category.js";
import { getRecipes } from "../controllers/recipe.js";

const router = express.Router();

router.get("/", 
    getCategories, 
    getRecipes,
    getCategoryDetails, 
    async(req, res)=>res.json(res.categories)
);

export default router;