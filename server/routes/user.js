import express from "express";
import { getRecipes, filterByUser, getOnEditRecipes } from "../controllers/recipe.js";
import { 
  authenticateUser, followUser, getAverageUserRating, 
  getUser, getUsers, getUserDetails, 
  searchUsers, updateUser, unfollowUser, getFollowing
} from "../controllers/user.js";
import validateUser from "../middlewares/auth.js";

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
  getFollowing, 
  async(req, res)=>res.status(200).json({user:res.user, recipes:res.recipes, onEdit:res.onEdit})
);

// Follow other user
router.put("/follow/:toFollow", validateUser, followUser);
router.put("/unfollow/:toUnfollow", validateUser, unfollowUser);

router.post("/", authenticateUser);

router.put("/:slug", 
  getUser, updateUser, 
  async(req, res)=>res.status(200).json(res.user)
);

export default router;