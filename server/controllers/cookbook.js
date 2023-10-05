import slugify from "slugify";
import Cookbook from "../models/cookbook.js";
import Recipe from "../models/recipe.js";

export const getCookbooks = async(req, res, next)=>{
    try{
        const cookbooks = await Cookbook.find({user:req.user}).
            populate({path:'recipes', model:Recipe })
        req.cookbooks = cookbooks;
        next();
    }catch(err){
        return res.status(500).json(err);
    }
}

export const getCookbookDetails = async(req, res, next)=>{
    Promise.all(req.cookbooks.map(async(cookbook)=>{
        return({
            name: cookbook.name,
            slug: cookbook.slug,
            numRecipes: cookbook.recipes.length,
            images: cookbook.recipes.map(recipe=>recipe.image).slice(0,4)
        })
    })).then((cookbooks)=>{
        res.cookbooks = cookbooks.sort((a,b)=>b.numRecipes-a.numRecipes);
    }).catch((err)=>{
        return res.status(500).json({ error: "Server error. Please try again" });
    }).finally(()=>{
        next();
    })
}

export const searchCookbooks = async(req, res, next)=>{
    try{
        const query = req.query.query ?? null;
        if (query!== null){
            req.cookbooks = req.cookbooks.filter(cookbook=>cookbook.name.toLowerCase().includes(query.toLowerCase()));
        }
        next();
    } catch(err){
        return res.status(500).json({ error: "Server error. Please try again" });
    }
}

export const getCookbook = async(req, res, next)=>{
    try{
        const cookbook = await Cookbook.findOne({user:req.user, slug:req.params.id}).
            populate({path:'recipes', model:Recipe })
        res.recipes = cookbook.recipes;
        next();
    }catch(err){
        return res.status(500).json(err);
    }
}

export const saveCookbook = async(req, res, next)=>{
    try{
        const { name } = req.body; 
        const cookbook = new Cookbook({name, user:req.user._id, slug:slugify(name.toLowerCase())});
        cookbook.save();
        next();
    }catch(err){
        return res.status(500).json(err);
    }
}

export const addRecipeToCookbook = async(req, res, next)=>{
    try{
        const { recipe } = req.body;
        const toAdd = await Recipe.findOne({slug:recipe});
        await Cookbook.findOneAndUpdate({user:req.user, slug:req.params.id}, {$pull:{recipes:toAdd._id}})
        await Cookbook.findOneAndUpdate({user:req.user, slug:req.params.id}, {$push:{recipes:toAdd._id}})
        next();
    }catch(err){
        return res.status(500).json(err);
    }
}

export const deleteRecipeFromCookbook = async(req, res, next)=>{
    try{
        const { recipe } = req.body;
        const toDelete = await Recipe.findOne({slug:recipe});
        await Cookbook.findOneAndUpdate({user:req.user, slug:req.params.id}, {$pull:{recipes:toDelete._id}})
        next();
    }catch(err){
        return res.status(500).json(err);
    }
}

export const deleteCookbook = async(req, res, next)=>{
    try{
        await Cookbook.findOneAndDelete({user:req.user, slug:req.params.id});
        next();
    }catch(err){
        return res.status(500).json(err);
    }
}