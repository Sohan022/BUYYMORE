import express from 'express';
import { placeorderHandler, razorpayHandler, verificationHandler, keyHandler, orderDetailsHandler, allorderHandler } from '../handlers/orderHandler.js';
const router = express.Router();
import {isAuth} from '../middleware/authStatus.js';

router.post('/placeorder',isAuth,placeorderHandler);
router.post('/razorpay',razorpayHandler);
router.post('/verification',verificationHandler);
router.get('/key',keyHandler);
router.get('/:id',orderDetailsHandler);
router.get('/allorder/:userid',isAuth,allorderHandler);


export {router as default};