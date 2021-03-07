import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {useSelector, useDispatch} from 'react-redux';
import CheckoutSteps from '../../components/checkoutSteps';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { createOrder } from '../../actions/orderActions';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import Axios from 'axios';



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight:'bold'
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1604118469935-7a9ff84bef1b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjh8fHNob3BwaW5nJTIwYmFnfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'top-center',
    height:'100vh',
  },
    layout: {
        paddingTop:'50px',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
    },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    form:{
        marginLeft:'35px',
        marginRight:'35px'
    },
    summary:{
        fontWeight:'bold'
    },
    payment:{
        marginLeft:'25px'
    }
}));

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

export default function Review(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems, paymentMethod } = cart;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 300 ? toPrice(0) : toPrice(60);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const handleNext = (e) =>{
    cart.cartItems.forEach((item)=>{
        delete item['stock'];
    })
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  }

  const handleBack =(e)=>{
      e.preventDefault();
      props.history.push('/paymentmethod');
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  useEffect(() => {
      const displayRazorpay =  async() => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return;
        }
        const razorpayKey = await Axios.get('https://buyymore.herokuapp.com/order/key');
        console.log(razorpayKey.data);
        const {data} = await Axios.post('https://buyymore.herokuapp.com/order/razorpay',{totalPrice:order.totalPrice,orderid:order._id});
  
        console.log(data);
  
        const options = {
            key:razorpayKey.data,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: 'BUYYMORE',
            description: 'Thank you for Shopping',
            image: 'data:image/png;base64,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',
            handler: function (response) {
                alert(response.razorpay_payment_id)
                alert(response.razorpay_order_id)
                alert(response.razorpay_signature)
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }
      
    if (success && !order.isPaid) {
        if(paymentMethod !== 'COD'){
            displayRazorpay();
        }
      
      props.history.push('/allorder');
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);


  

  return (
    <React.Fragment>
        <div className={classes.image}>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <CheckoutSteps activeStep={3}></CheckoutSteps>
            <div className={classes.form}>
            <Typography variant="h6" gutterBottom className={classes.summary}>
                Order summary
            </Typography>
            <List disablePadding>
                {cartItems.map((item) => (
                <ListItem className={classes.listItem} key={item.product}>
                    <ListItemText>{item.name}</ListItemText>
                    <ListItemText primary={+ item.qty + " items * ₹" + item.price } />
                    <Typography variant="body2">{"₹ " + item.price * item.qty}</Typography>
                </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText>Delivery Charge</ListItemText>
                    <Typography variant="subtitle1">
                        ₹ {cart.shippingPrice}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText><strong>Total</strong></ListItemText>
                    <Typography variant="subtitle1" className={classes.total}>
                        ₹ {cart.totalPrice}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                    Shipping Address
                </Typography>
                <Typography gutterBottom>{shippingAddress.fullName}</Typography>
                <Typography gutterBottom>{shippingAddress.address +", " + shippingAddress.city +", "+ shippingAddress.state +", "+ shippingAddress.postalCode +", "+ shippingAddress.country}</Typography>
                    </Grid>
                <Grid item xs={12} sm={5} className={classes.payment}>
                        <Typography variant="h6" gutterBottom className={classes.title}>
                            Payment details
                        </Typography>
                        <Typography gutterBottom><span style={{fontWeight:'bold'}}>Payment Method:</span> {paymentMethod}</Typography>
                    </Grid>
                </Grid>
         
        <div className={classes.buttons}>
            <Button onClick={handleBack} className={classes.button}>
            Back
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
            >
                Place Order
        </Button>
        
        </div>
        </div>
            </Paper>
        </main>
      </div>
    </React.Fragment>
  );
}