import express from "express";
import { getRecipe } from "../controllers/recipe.js";
import { addReview, deleteReview, getReview, updateReview } from "../controllers/review.js";
import validateUser from "../middlewares/auth.js";

const router = express.Router();

router.get("/:id", validateUser, getRecipe, getReview, async(req, res)=>(res.json(res.review)))
router.delete("/:id", validateUser, getRecipe, deleteReview);
router.post("/:id", validateUser, getRecipe, addReview);
router.put("/:id", validateUser, getRecipe, updateReview);

export default router;

