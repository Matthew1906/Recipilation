import express from "express";
import firebaseAdmin from "../services/firebase.js";
import {Recipe, User} from "../models/index.js";

const router = express.Router();

router.get("/", async(req, res) =>{
  const users = await User.find();
  return res.json(users);
})

router.get("/:slug", async(req, res)=>{
  const user = await User.findOne({slug:req.params.slug}, 'username email image dob following')
  const recipes = await Recipe.find({user:user._id}, 'name slug description image serving_size difficulty cooking_time preparation_time');
  return res.json({user, recipes});
})

router.post("/", async (req, res) => {
  const { email, username, password=null, type } = req.body;
  try{
    if(type=='oauth'){
      const firebaseUser = await firebaseAdmin.auth.getUserByEmail(email);
      const newUser = new User({username, email, firebaseId:firebaseUser.uid});
      const checkUser = await User.find({email});
      if(checkUser.length == 0){
        newUser.save();
      }
      return res.status(200).json({ success: "Account created successfully. Please sign in." });
    }
    else{
      if (!email || !username || !password) {
        return res.status(400).json({ error:"Invalid request body. Must contain email, password, and username." });
      }
      const newFirebaseUser = await firebaseAdmin.auth.createUser({ email, password });
      if (newFirebaseUser) {
        const newUser = new User({username, email, firebaseId:newFirebaseUser.uid});
        newUser.save();
      }
      return res.status(200).json({ success: "Account created successfully. Please sign in." });
    }
  } catch (err) {
    if (err.code === "auth/email-already-exists") {
      return res.status(400).json({ error: "User account already exists at email address." });
    }
    return res.status(500).json({ error: "Server error. Please try again" });
  }
});

export default router;