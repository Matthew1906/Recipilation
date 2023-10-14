import fs from 'fs';
import slugify from 'slugify';
import db from "./config/db.js";
import config from "./config/index.js";
import { categories, getRecipes, getSteps, users, userIds, reviews } from './config/seed.js';
import { RecipeCategory, RecipeEquipment, Recipe, RecipeStep, User, Review } from "./models/index.js";
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
        console.log('Finish adding category: ' + category);
    });
};

const seedUsers = ()=>{
    users.forEach(async(user)=>{
        const email = user.replace(' ', '').toLowerCase() + '@gmail.com';
        const slug = user.replace(' ', '-').toLowerCase();
        const newFirebaseUser = await firebaseAdmin.auth.createUser({ displayName:user, email, password:slug });
        if (newFirebaseUser) {
            const filename = `${slug}.jpg`;
            const file = fs.readFileSync(`./data/users/${filename}`)
            const base64String = Buffer.from(file).toString('base64')
            const {imageId, image} = await uploadImage(base64String, filename, 'users')
            const newUser = new User({
                username:user, 
                slug:slugify(user).toLowerCase(),
                email, 
                firebaseId:newFirebaseUser.uid,
                imageId, image, 
                dob: new Date(1985, 1+Math.floor(Math.random()*11), 1+Math.floor(Math.random()*27)) 
            });
            newUser.save();
            console.log(newUser._id);
        };
    });
};

const seedEquipments = async ()=>{
    const recipes = await getRecipes();
    const equipmentsRaw = recipes.map(recipe=>recipe.equipments).join(',').toLowerCase();
    const equipments = Array.from(new Set(equipmentsRaw.split(',').map(val=>val.trim()).filter(val=>val!=='')))
    equipments.forEach(async (equipment)=>{
        const filename = `${slugify(equipment)}.webp`;
        const file = fs.readFileSync(`./data/equipments/${filename}`)
        const base64String = Buffer.from(file).toString('base64')
        const {imageId, image} = await uploadImage(base64String, filename, 'equipments')
        const new_equipment = new RecipeEquipment({
            name:equipment, 
            slug:slugify(equipment),
            imageId, image
        })
        await new_equipment.save();
        console.log('Finish adding equipment: ' + equipment);
    })
}

const seedRecipes = async ()=>{
    const recipes = await getRecipes();
    recipes.forEach(async recipe=>{
        // Helper function to get list of slugs from string
        const getSlugs = (itemstr)=> itemstr.split(",")
            .map(item=>slugify(item.trim().toLowerCase()))
            .filter(item=>item!=='')
        // Helper function to get the ids based on the given slugs
        const getIds = async (slugs, Model) => await Promise.all(
            slugs.map(async(slug)=>{
                const item = await Model.findOne({slug});
                return item._id;
            })
        );
        // Get all category ids
        const category_slugs = getSlugs(recipe.categories);
        const category_ids = await getIds(category_slugs, RecipeCategory);
        // Get all equipment ids
        const equipment_slugs = getSlugs(recipe.equipments);
        const equipment_ids = await getIds(equipment_slugs, RecipeEquipment);
        // Get all step ids
        const getSteps = async()=>{
            const steps = await RecipeStep.find({recipe:slugify(recipe.name).toLowerCase()}, '_id');
            return steps.map(step=>step._id);
        }
        const step_ids = await getSteps();
        // Get recipe image
        const filename = `${slugify(recipe.name).toLowerCase()}.webp`;
        const file = fs.readFileSync(`./data/recipes/${filename}`)
        const base64String = Buffer.from(file).toString('base64')
        const {imageId, image} = await uploadImage(base64String, filename, 'recipes')
        const new_recipe = new Recipe({
            name: recipe.name,
            slug:slugify(recipe.name).toLowerCase(),
            user: userIds[Math.floor(Math.random()*userIds.length)],
            description: recipe.description,
            categories: category_ids,
            imageId,
            image,
            serving_size: recipe.servingSize,
            difficulty: recipe.difficulty,
            cooking_time: recipe.cookingTime,
            preparation_time: recipe.preparationTime,
            ingredients:recipe.ingredients.split("\n"),
            equipments:equipment_ids,
            steps:step_ids,
        });
        await new_recipe.save();
        console.log('Finish adding recipe: ' + recipe.name);
    })
}

const seedSteps = async()=>{
    const steps = await getSteps();
    steps.forEach(async step=>{
        const new_step = new RecipeStep({
            index:step.index,
            recipe:slugify(step.recipe).toLowerCase(),
            title:step.title,
            details:step.details==""?'-':step.details,
        });
        console.log(step.image);
        if(step.image!==''){
            const filename = `${step.image}.webp`;
            const file = fs.readFileSync(`./data/recipes/${filename}`)
            const base64String = Buffer.from(file).toString('base64')
            const {imageId, image} = await uploadImage(base64String, filename, 'steps')
            new_step.imageId = imageId;
            new_step.image = image;
        }
        await new_step.save();
        console.log(`Finished adding step ${step.index} of ${step.recipe}`);
    })
}

const seedReviews = async()=>{
    const recipes = await Recipe.find({});
    recipes.forEach(recipe=>{
        const ids = userIds.filter(id=>id.toString()!==recipe.user.toString());
        const new_reviews = [...reviews].sort(() => 0.5 - Math.random()).
            slice(0, 2).map(review=>{
                const random_user = ids[Math.floor(Math.random()*ids.length)];
                const index = ids.indexOf(random_user);
                ids.splice(index, 1);
                const new_review = new Review({
                    user:random_user,
                    body:review,
                    date:new Date(2023, 1+Math.floor(Math.random()*5), 1+Math.floor(Math.random()*27)) ,
                    difficulty:Math.floor(Math.random())===0?"easy":"medium",
                    rating:4+Math.floor(Math.random())
                })
                new_review.save()
                return new_review._id;
            })
        recipe.reviews = new_reviews;
        recipe.save(); 
        console.log(`Finish adding new reviews for ${recipe.name}`)
    })
}

// await seedEquipments();
// await seedSteps();
// await seedRecipes();
// await seedReviews();

// await Recipe.updateMany({}, {status:1})
// console.log('uPDATED')