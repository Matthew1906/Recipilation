import { model, Schema } from "mongoose";

const userSchema = Schema({
    username: {type:String, required:true, trim:true},
    slug: {type:String, required:true, trim:true},
    email: {type:String, required:true, unique:true, trim:true},
    firebaseId: {type:String, required:true},
    imageId: {type:String},
    image: {type:String, trim:true},
    dob : {type:Date},
    followers:[{type:String}],
})

const User = model('user', userSchema);

export default User;