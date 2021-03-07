import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Rating from '../Rating';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import {detailsProduct} from '../../actions/productActions';
import Loading from '../Loading.js';
import AlertMessage from '../AlertMessage.js';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { addToCart} from '../../actions/cartActions';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rate from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { List, ListItem, TextField } from '@material-ui/core';
import {reviewProduct} from '../../actions/productActions';

const useStyles = makeStyles((theme)=>({
    root: {
      maxWidth: 500,
      marginBottom:'30px'
      
    },
    brand:{
      color:'#1AC7E4',
      marginBottom:'5px'
    },
    price:{
        margin:'20px 0 10px 0',
        color:'#152427'
    },
    details:{
        marginTop:'40px',
        marginBottom:'5px'
    },
    items:{
        marginBottom:'5px'
    },
    margin: {
        margin: theme.spacing(1),
        marginTop:'5px'
      },
      stock:{
        marginTop:'50px',
        color:'#4F7F21',
        fontSize:'20px'
      },
      stockZero:{
        marginTop:'50px',
        color:'red',
        fontSize:'20px'
      },
      formControl: {
       marginRight:'20px',
        minWidth: 80,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      inputlabel: {
          color:'black',
          fontSize:'1.15rem',
          
      },
      link:{
          color:'white',
          textDecoration:'none'
      },
      lastline:{
          fontSize:'1.2rem',
          marginTop:'40px',
          fontWeight:'bold',
          color:'#212D33',
          '&:hover':{
              color:'black',
              cursor:'pointer'
          }
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      reviewButton:{
          marginTop:'10px',
          position:'relative',
          left:80
      },
      ratingList:{
          backgroundColor:'#FBFCFC'
      },
      allrating:{
          marginRight:'10px'
      }
    }));

function ProductDetails(props) {
    const classes = useStyles();
    const productDetails = useSelector(state  => state.productDetails);
    const {loading, error, product} = productDetails;
    const productid = props.match.params.id;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsProduct(productid));
    },[dispatch,productid]);

    const [qty, setQty] = useState(1);

    const addToCartHandler = (id,qty) => {
        dispatch(addToCart(id,qty));
        props.history.push('/cart');
    };

    const cart = useSelector((state)=> state.cart);
    const {cartItems} = cart;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo} = userLogin;

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [review, setReview] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitReview =()=>{
      if(userInfo){
          if(value && review){
            const reviews = {
                rating:Number(value),
                review:review,
                username:userInfo.name,
            }
          dispatch(reviewProduct(productid,reviews));
          }
          else{
              alert("Please provide both rating and review");
          }
        
      } else{
          props.history.push('/login');
      }
        
      setOpen(false);

  }
    
    return (
        <Container fixed style={{paddingTop:'100px'}}>
            {loading ? (
                    <Loading></Loading>
                ) : error ? (
                    <AlertMessage type="error">{error}</AlertMessage>
                ) : (
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Card key={product._id} className={classes.root}>
                            
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    alt={product.name}
                                    height="600"
                                    image={product.image}
                                    title={product.name}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <div>
                                <h2 className={classes.brand}>{product.brand}</h2>
                                <Typography className={classes.name} gutterBottom variant="h5" component="h2">{product.name}</Typography>
                                <Typography variant="h4" gutterBottom className={classes.price}>₹ {product.price}</Typography>
                                <Rating rating={product.rating} numReviews={product.ratingReviews.length} right={false}></Rating>
                                
                                <h3 className={classes.details}>Product Details:</h3>
                                <ul>
                                    {product.description.map((detail, index)=>{
                                    return  <li key={index} className={classes.items}>{detail}</li>
                                    })}
                                </ul>
                                {
                                    product.stock === 0
                                ?
                                    <div>
                                        <p className={classes.stockZero}>Out of Stock</p> 
                                        <FormControl className={classes.formControl} disabled>
                                            <InputLabel shrink htmlFor="age-native-label-placeholder" className={classes.inputlabel}>
                                            Quantity
                                            </InputLabel>
                                            <NativeSelect
                                                value={qty}
                                                onChange={(e)=> setQty(Number(e.target.value))} 
                                            >
                                                {[...Array(product.stock).keys()].map(
                                                    (x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                    )
                                                )}
                                                
                                            </NativeSelect>
                                        </FormControl>
                                        <Button  variant="contained" size="large" className={classes.margin} disabled>Add to Cart</Button>
                                    </div>
                                : (
                                    (cartItems.find((item)=> item.product === product._id)
                                    ? <div>
                                            <p className={classes.stock}>In Stock</p>
                                            <FormControl className={classes.formControl} disabled>
                                                <InputLabel shrink htmlFor="age-native-label-placeholder" className={classes.inputlabel}>
                                                Quantity
                                                </InputLabel>
                                                <NativeSelect
                                                    value={qty}
                                                    onChange={(e)=> setQty(Number(e.target.value))} 
                                                >
                                                    {[...Array(product.stock).keys()].map(
                                                        (x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                        )
                                                    )}
                                                    
                                                </NativeSelect>
                                            </FormControl>
                                            <Button variant="contained" size="large" color="primary" className={classes.margin}>
                                                    <Link to='/cart' className={classes.link}>Go To Cart</Link>
                                                </Button>
                                        </div> 
                                    
                                    : <div>
                                            <p className={classes.stock}>In Stock</p>
                                            <FormControl className={classes.formControl} >
                                                <InputLabel shrink htmlFor="age-native-label-placeholder" className={classes.inputlabel}>
                                                Quantity
                                                </InputLabel>
                                                <NativeSelect
                                                    value={qty}
                                                    onChange={(e)=> setQty(Number(e.target.value))} 
                                                >
                                                    {[...Array(product.stock).keys()].map(
                                                        (x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                        )
                                                    )}
                                                    
                                                </NativeSelect>
                                            </FormControl>
                                            <Button onClick={() => addToCartHandler(product._id,qty)} variant="contained" size="large" color="primary" className={classes.margin}>Add to Cart</Button>
                                        </div>
                                    )
                                )
                                    
                                }   
                            </div>
                            <div>
                            <p className={classes.lastline} onClick={handleOpen}>Rate and Review this product</p>
                            <Modal className={classes.modal} 
                                    open={open}
                                    onClose={handleClose}
                                    >
                                <Fade in={open}>
                                <div className={classes.paper}>
                                <Typography component="legend"><strong>Rating</strong></Typography>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    
                                    <Rate
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    />
                                </Box>
                                <Typography component="legend"><strong>Review</strong></Typography>
                                    <TextField fullWidth onChange={(e)=>setReview(e.target.value)}></TextField>
                                    <Button onClick={submitReview} variant="contained" color="primary"  className={classes.reviewButton}>Submit</Button>
                                </div>
                                </Fade>
                                </Modal>
                            </div>
                            
                        </Grid>
                        <Grid item md={6} xs={12}>
                        <List className={classes.ratingList}>
                            {product.ratingReviews.map((item)=>{
                                return <div>
                                        <ListItem><Rate name="read-only" value={item.rating} className={classes.allrating} readOnly />{item.review}</ListItem>
                                        <ListItem divider style={{fontSize:'0.9rem'}}><span className={classes.allrating}>{item.username}</span>{item.createdAt.slice(0,10)}</ListItem>
                                   
                                    {/* <Typography component="legend">{item.username}</Typography>
                                        <Rate name="read-only" value={item.rating} readOnly />
                                        <p>{item.review}</p> */}
                                </div>
                                 
                            })}
                          </List>  
                        </Grid>
                    </Grid>
                )}
            
        </Container>
    )
}

export default ProductDetails
