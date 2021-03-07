import {Product} from '../models/product.js';
import {User} from '../models/users.js';
import moment from 'moment';

export const allProductHandler = async(req,res,next) =>{
    try{
        const products = await Product.aggregate([{
            $project:{
                _id:1,
                category:1,
                name:1,
                brand:1,
                rating:1,
                numReviews:{$size:"$ratingReviews"},
                price:1,
                image:1
            }
        }]);
        res.status(200).json(products);
    }
    catch{
        res.status(500).json({message:"Technical Issue, Try after sometime!"});
    }
}

export const productDetailsHandler = async(req,res, next) =>{
    try{
        const productdetails = await Product.findById(req.params.id);
        if(productdetails){
            res.status(200).json(productdetails);
        }
        else{
            res.status(404).json({message:"product not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Technical Issue, Try after sometime!"});
    }
}

export const addProductHandler = async(req,res,next) => {
    try{
        const finduser = await User.findById(req.params.userid);
        if(finduser.isAdmin){
            const newProduct = await Product.create(req.body);  
            res.status(200).json(newProduct);
        }
        else{
            res.status(401).json({message:"You didn't have permission to add product"});
        }
        
    }
    catch{
        res.status(500).json({message:"Technical Issue, Try after sometime!"});
    }
}


export const reviewsHandler = async(req,res,next) =>{
    try{
        const findProduct = await Product.findById(req.params.productid);
        if(!findProduct){
            res.status(400).json({message:"product not found"});
        }
        else{
            
            const updateReview = await Product.findOneAndUpdate({_id:req.params.productid},{$addToSet:{
                ratingReviews:{
                    createdAt: moment().format(),
                    rating: req.body.rating,
                    username: req.body.username,
                    updatedby: req.params.userid,
                    review:req.body.review,
                },

            },
            $set:{rating:(((findProduct.rating*findProduct.ratingReviews.length)+req.body.rating)/(findProduct.ratingReviews.length+1))}
        }
        )
            res.status(200).json(updateReview);
        }
    }
    catch(error){
        res.status(500).json(error.message);
    }
}