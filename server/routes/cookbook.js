import express from "express";

const router = express.Router();

router.get("/", 
    async(req, res)=>res.json(res.cookbooks)
);

router.get("/:id", 
    async(req, res)=>res.json(res.recipes)
);

export default router;