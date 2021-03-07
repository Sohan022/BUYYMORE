import mongoose from "mongoose";
const { Schema, model, Model, Types } = mongoose;
import moment from 'moment';

const productSchema = new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    brand:{type:String,required:true},
    description:[{type:String,required:true}],
    category:{type:String,required:true},
    rating:{type:Number,default:2.5},
    ratingReviews:[{
        createdAt:{type:String, default:moment().format('MMMM Do YYYY, hh:mm A')}, // 2020-09-18T13:07:30+05:30
        rating:{type:Number},
        review:{type:String},
        updatedby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        username:{type:String}
    },]
});

export const Product = model('ProductDetails',productSchema);