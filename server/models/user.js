import { model, Schema } from "mongoose";

const userSchema = Schema({
    username: {type:String, required:true},
    email: {type:String, required:true},
    firebaseId: {type:String, required:true}
})

const User = model('user', userSchema);

export default User;