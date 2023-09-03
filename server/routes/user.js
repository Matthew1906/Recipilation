import express from "express";
import { getRecipes, filterByUser, getOnEditRecipes } from "../controllers/recipe.js";
import { 
  authenticateUser, getAverageUserRating, 
  getUser, getUsers, getUserDetails, 
  searchUsers, updateUser
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
  getOnEditRecipes,
  async(req, res)=>res.status(200).json({user:res.user, recipes:res.recipes, onEdit:res.onEdit})
);

router.post("/", authenticateUser);

router.put("/:slug", 
  getUser, updateUser, 
  async(req, res)=>res.status(200).json(res.user)
);

export default router;