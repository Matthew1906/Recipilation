import express from "express";
import { getRecipe } from "../controllers/recipe.js";
import { addReview, deleteReview, getReview, updateReview } from "../controllers/review.js";

const router = express.Router();

router.get("/:id", getRecipe, getReview, async(req, res)=>(res.json(res.review)))

router.delete("/:id", getRecipe, deleteReview);

router.post("/:id", getRecipe, addReview);

router.put("/:id", getRecipe, updateReview);

export default router;

