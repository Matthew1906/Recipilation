import slugify from 'slugify';
import RecipeCategory from './models/category.js';
import config from "./config/index.js";
import db from "./config/db.js";
import { categories } from './config/seed.js';

db(config.MONGODB_URI);

const seedCategories = ()=>{
    console.log(categories.length);
    categories.forEach(async(category)=>{
        const new_category = new RecipeCategory({
            name:category, 
            slug:slugify(category.toLowerCase())
        })
        await new_category.save()
        console.log('Finish adding ' + category + ' recipe category');
    });
};

seedCategories();