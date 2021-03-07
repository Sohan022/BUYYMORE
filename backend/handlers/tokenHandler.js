import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id:user._id,
            name:user.name,
            email:user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'15d',
        }
    );
}