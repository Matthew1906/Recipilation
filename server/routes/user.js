import express from "express";
import { getRecipes, filterByUser } from "../controllers/recipe.js";
import { 
  authenticateUser, getAverageUserRating, 
  getUser, getUsers, 
  getUserDetails, searchUsers 
} from "../controllers/user.js";

const router = express.Router();

router.get("/", 
  getUsers, 
  searchUsers,
  getUserDetails,
  async(req, res) =>res.status(200).json(res.users)
)

router.get("/:slug", 
  getUser, 
  getRecipes, 
  filterByUser, 
  getAverageUserRating,
  async(req, res)=>res.status(200).json({user:res.user, recipes:res.recipes})
);

router.post("/", authenticateUser);

export default router;