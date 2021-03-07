import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {useSelector, useDispatch} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {allOrders} from '../../actions/orderActions';
import Loading from '../Loading.js';
import AlertMessage from '../AlertMessage.js';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root:{
        padding:'1px 30px',
        marginBottom:'10px'
    },
  listItem: {
    padding:'0'
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight:'bold'
  },
    summary:{
        fontWeight:'bold'
    },
    payment:{
        marginLeft:'25px'
    },
    cover: {
        width: 151,
      },
      img:{
          width:80,
          height:100
      },
      imagelist:{
          width:150
      },
      link:{
          textDecoration:'none',
          fontSize:'1.2rem'
      }
}));


export default function MyOrder(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
    const orderList = useSelector((state) => state.allOrder);
    const {loading, error, allorder} = orderList;
    useEffect(() => {
        dispatch(allOrders());
    }, [dispatch]);

  return (
    <React.Fragment>
        <Container fixed style={{paddingTop:'100px'}}>
            <h1>My Orders</h1>
            {loading ? (
                    <Loading></Loading>
                ) : error ? (
                    <AlertMessage type="error">{error}</AlertMessage>
                ) : ( allorder.length === 0
                    ? (<AlertMessage type="info">There is no Order.</AlertMessage>)
                    : (
                        allorder.map((order)=>{
                            return<Card className={classes.root}>
                            <CardContent>
                                
                                <List disablePadding>
                                    {order.orderItems.map((item) => (
                                    <ListItem className={classes.listItem} key={item.product}>
                                        <ListItem className={classes.imagelist}>
                                        <img src={item.image} className={classes.img}></img>
                                        </ListItem>
                                        <ListItemText>
                                            <Link to={item.product} className={classes.link}>{item.name}</Link>
                                            </ListItemText>
                                        <ListItemText primary={+ item.qty + " items * ₹" + item.price } />
                                        <Typography variant="body2">{"₹ " + item.price * item.qty}</Typography>
                                    </ListItem>
                                    ))}
                                    <ListItem className={classes.listItem}>
                                        <ListItemText>Delivery Charge</ListItemText>
                                        <Typography variant="subtitle1">
                                            ₹ {order.shippingPrice}
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <ListItemText><strong>Total</strong></ListItemText>
                                        <Typography variant="subtitle1" className={classes.total}>
                                            ₹ {order.totalPrice}
                                        </Typography>
                                    </ListItem>
                                </List>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" gutterBottom className={classes.title}>
                                        Shipping Address
                                    </Typography>
                                    <Typography gutterBottom>{order.shippingAddress.fullName}</Typography>
                                    <Typography gutterBottom>{order.shippingAddress.address +", " + order.shippingAddress.city +", "+ order.shippingAddress.state +", "+ order.shippingAddress.postalCode +", "+ order.shippingAddress.country}</Typography>
                                        </Grid>
                                    <Grid item xs={12} sm={5} className={classes.payment}>
                                            <Typography variant="h6" gutterBottom className={classes.title}>
                                                Payment details
                                            </Typography>
                                            <Typography gutterBottom><span style={{fontWeight:'bold'}}>Payment Method:</span> {order.paymentMethod}</Typography>
                                            <Typography gutterBottom><span style={{fontWeight:'bold'}}>Paid:</span> {order.isPaid?"Yes":"No"}</Typography>
                                        </Grid>
                                    </Grid>
                            
                            
                            </CardContent>
                            </Card>
})))}
        </Container>
    </React.Fragment>
  );
}