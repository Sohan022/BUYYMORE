import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Rating from './Rating';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    marginBottom:'30px'
    
  },
  content:{
      padding:'10px 20px',
      cursor:'alias'
  },
  brand:{
    marginBottom:'3px'
  },
  price:{
      margin:'5px 0 0 0',
  }
});

export default function Product({product}) {
  const classes = useStyles();

  return (
    <Grid item md={4} sm={6} xs={12}>
    <Card key={product._id} className={classes.root}>
    
      <CardActionArea>
      <Link to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          alt={product.name}
          height="400"
          image={product.image}
          title={product.name}
        />
         </Link>
        <CardContent className={classes.content}>
          <Typography className={classes.brand} gutterBottom variant="h5" component="h2">
            {product.brand}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.name}
          </Typography>
          <h2 className={classes.price}> ₹ {product.price}</h2>
          <Rating rating={product.rating} numReviews={product.numReviews} right={true}></Rating>
        </CardContent>
      </CardActionArea>
     
    </Card>
    </Grid>
  );
}

