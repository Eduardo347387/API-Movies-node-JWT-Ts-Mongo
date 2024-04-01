import mongoose from "mongoose";
import { string } from "zod";

const user = new mongoose.Schema(
    {
        email: {type:String,require:true,unique:true},
        password: {type:String,require:true}
    }
)

const User = mongoose.model('User', user);

export default User;