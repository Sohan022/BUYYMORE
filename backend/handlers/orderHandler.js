import Order from '../models/order.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();


const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const placeorderHandler = async(req,res,next) =>{
    try{
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
          });
          const createdOrder = await order.save();
          res.status(200).json(createdOrder);
    }
    catch(error){
        res.status(500).json(error);
    }
}

export const razorpayHandler =  async (req, res, next) => {
	const payment_capture = 1;
	const amount = req.body.totalPrice;
    const receiptid = req.body.orderid;
	const currency = 'INR';

	const options = {
		amount: amount * 100,
		currency,
		receipt: receiptid,
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options);
		const updatedOrder = await Order.updateOne({_id:response.receipt},{$set:{paymentOrderId:response.id}});
		res.json(response);
	} catch (error) {
		console.log(error);
	}
}


export const verificationHandler = async(req,res,next)=>{
    const secret = process.env.RAZORPAY_VERIFICATION_SECRET;

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body));
	const digest = shasum.digest('hex')

	if (digest === req.headers['x-razorpay-signature']) {
		const updateOrder = await Order.findOneAndUpdate({paymentOrderId:req.body.payload.payment.entity.order_id},{$set:{isPaid:true}});
	} else {
		// pass it
	}
	res.status(200).json({message:'OK'});
}

export const keyHandler = (req,res,next) =>{
    res.status(200).send(process.env.RAZORPAY_KEY_ID);
}

export const orderDetailsHandler = async(req,res)=>{
	const orderdetails = Order.findById(req.params.id);
	res.status(200).json(orderdetails);
}


export const allorderHandler = async(req,res,next)=>{
	try{
		const allorders = await Order.find({user:req.params.userid});
	if(allorders){
		
		res.status(200).json(allorders);
	}
	else{
		res.status(404).json({message:"No Order yet"});
	}
	}
	catch(error){
		res.status(500).json(error.message);
	}
	
}