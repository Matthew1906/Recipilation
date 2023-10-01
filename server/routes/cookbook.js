import express from "express";
import validateUser from "../middlewares/auth.js";
import { 
    addRecipeToCookbook,
    deleteCookbook,
    getCookbook, getCookbookDetails, getCookbooks, 
    saveCookbook, searchCookbooks 
} from "../controllers/cookbook.js";

const router = express.Router();

router.use(validateUser);

router.get("/", 
    getCookbooks,
    searchCookbooks,
    getCookbookDetails,
    async(req, res)=>res.json(res.cookbooks)
);

router.get("/:id", 
    getCookbook,
    async(req, res)=>res.json(res.recipes)
);

router.post("/", saveCookbook);

router.put("/:id", addRecipeToCookbook);

router.delete("/:id", deleteCookbook);

export default router;