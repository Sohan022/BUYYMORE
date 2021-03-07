import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import {useDispatch, useSelector} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertMessage from '../AlertMessage.js';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      minHeight:'180px',
      marginBottom:'20px'
    },
    formControl: {
         minWidth: 60,
       },
    content: {
      flex: '1 0 auto',
      marginLeft:'20px'
    },
    cover: {
      width: 151,
    },
    link:{
        textDecoration:'none',
        color:'#03131D',
        fontWeight:'bold',
        '&:hover':{
            color:'blue'
        }
    },
    price:{
        color:'#273746'
    },
    secondcard:{
        padding:'30px 20px',
        backgroundColor:'#F3F7FA',
        
    },
    checkoutPrize:{
        marginLeft:'10px'
    },
    buttonalign:{
        textAlign:'center',
        marginTop:'30px'
    },
    checkout:{
        fontSize:'1.5rem',
        fontWeight:'bold'
    },
    deleteAlign:{
        display:'flex',
        alignItems:'center',
    },
    deletebutton:{
        fontSize:'2rem',
        color:'#646D72',
        cursor:'pointer',
        '&:hover':{
            color:'#3C4042'
        }
    },
    shoppingCart:{
        color:'#2A2C2D',
        marginTop:'0px'
    }
    
  }));

export default function Cart(props) {
    const classes = useStyles();
  const theme = useTheme();

    const dispatch = useDispatch();

    const cart = useSelector((state)=> state.cart);
    const {cartItems} = cart;

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
      };
    
    const checkoutHandler = () => {
        props.history.push('/login?redirect=shipping');
    };
  return (
    <Container fixed style={{paddingTop:'100px'}}>
        {cartItems.length === 0 ? (
          <AlertMessage>
            Cart is empty. <Link to="/" className={classes.link}>Go Shopping</Link>
          </AlertMessage>
        ) : (
            <div>
            <h1 className={classes.shoppingCart}>Shopping Cart</h1>
            <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                    {cartItems.map((item)=>{
                        return <Card key={item.product} className={classes.root}>
                    
                            <CardMedia
                                className={classes.cover}
                                image={item.image}
                                title={item.name}
                            />
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    <Link to={`/product/${item.product}`} className={classes.link}>
                                
                                        {item.name}
                                    </Link>
                                </Typography>
                                
                                <h3 className={classes.price}>₹ {item.price}</h3>
                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink htmlFor="age-native-label-placeholder" className={classes.inputlabel}>
                                    Quantity
                                    </InputLabel>
                                    <NativeSelect
                                        value={item.qty}
                                        onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))} 
                                    >
                                        {[...Array(item.stock).keys()].map(
                                            (x) => (
                                            <option key={x + 1} value={x + 1}>  
                                                {x + 1}
                                            </option>
                                            )
                                        )}
                                        
                                    </NativeSelect>
                                </FormControl>
                                
                                
                            </CardContent>
                            
                            <CardContent className={classes.content, classes.deleteAlign}>
                                <DeleteIcon className={classes.deletebutton} onClick={() => removeFromCartHandler(item.product)}></DeleteIcon>
                            </CardContent>
                        </Card>
                    
                    })}
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card className={classes.root, classes.secondcard}>
                        <p className={classes.checkout}>
                            Subtotal ({cartItems.length} items) : 
                            <span className={classes.checkoutPrize}> ₹ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span>  
                            
                        </p>
                        <div className={classes.buttonalign}>
                            <Button variant="contained" size="large" color="primary" onClick={checkoutHandler} disabled={cartItems.length === 0}>Proceed to Checkout</Button>
                        </div>            
                    </Card>
                </Grid>

            </Grid>
        </div>
        )}
    </Container>
  );
}