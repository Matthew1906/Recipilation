import express from "express";
import { getRecipe } from "../controllers/recipe.js";
import { addReview } from "../controllers/review.js";

const router = express.Router();

router.post("/:id", getRecipe, addReview);

export default router;

