import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

//database
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
mongoose.connection.on('connected', () => {
    console.log('Database is connected');
});
mongoose.connection.on('error',()=>{
    console.log('Error occured in connecting database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



//routes
app.get('/', (req,res)=>{
    res.send('get request');
});


app.use('/auth',authRoutes);
app.use('/product',productRoutes);
app.use('/order',orderRoutes);


//server
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server has started on port: ${port}`);
})