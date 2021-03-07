import {User} from '../models/users.js';
import Bcrypt from 'bcrypt';
import {generateToken} from './tokenHandler.js';

export const signupHandler = async (req,res,next) => {
    try{
        const finduser = await User.findOne({ email: req.body.email });
        if(finduser){
            res.status(400).json({message:"user already exists!"});
        }
        else{
            const newuser = new User({
                email:req.body.email,
                name:req.body.name,
                password:Bcrypt.hashSync(req.body.password,10),
            })
            
            const user = await newuser.save();
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user),
            });
        }
    }
    catch{
        res.status(500).json({message:"Technical Issue, Try after sometime!"});
    }
    
};

export const signinHandler = async (req,res,next) => {
    try{
        let email = req.body.email;
        let password = req.body.password;
        const user = await User.findOne({ email: email });
        if(!user){
            res.status(404).json({message:"Email or Password wrong!"});
        }
        else if(!Bcrypt.compareSync(password, user.password)){
            res.status(400).json({message:"incorrect password"});
        }
        else{
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user),
            });
        }
    }
    catch{
        res.status(500).json({message:"Technical Issue, Try after sometime!"});
    }
    
};