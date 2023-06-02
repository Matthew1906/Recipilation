import fs from 'fs';
import slugify from 'slugify';
import config from "./config/index.js";
import db from "./config/db.js";
import { categories, recipes, steps, users } from './config/seed.js';
import RecipeCategory from './models/category.js';
import User from './models/user.js';
import firebaseAdmin from './services/firebase.js'
import { uploadImage } from './services/imagekit.js';

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

const seedUsers = ()=>{
    users.forEach(async(user)=>{
        const email = user.replace(' ', '').toLowerCase() + '@gmail.com';
        const slug = user.replace(' ', '-').toLowerCase();
        const newFirebaseUser = await firebaseAdmin.auth.createUser({ email, password:slug });
        if (newFirebaseUser) {
            const filename = `${slug}.jpg`;
            const file = fs.readFileSync(`./data/users/${filename}`)
            const base64String = Buffer.from(file).toString('base64')
            const {imageId, image} = await uploadImage(base64String, filename, 'users')
            const newUser = new User({
                username:user, 
                email, 
                firebaseId:newFirebaseUser.uid,
                imageId, image, 
                dob: new Date(1985, 1+Math.floor(Math.random()*11), 1+Math.floor(Math.random()*27)) 
            });
            newUser.save();
            console.log(newUser.firebaseId);
        };
    });
};

const seedRecipes = ()=>{

}