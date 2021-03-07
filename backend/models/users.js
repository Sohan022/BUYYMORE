import mongoose from "mongoose";
const { Schema, model, Model, Types } = mongoose;

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false}
});

export const User = model('UserDetails',userSchema);