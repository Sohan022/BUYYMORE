import React, { useEffect} from 'react';
import Product from '../Product.js';
import Loading from '../Loading.js';
import AlertMessage from '../AlertMessage.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {useSelector, useDispatch} from 'react-redux';
import { listProducts } from '../../actions/productActions.js';


export default function Home() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product);
    const {loading, error, products} = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return (
      
            <Container fixed style={{paddingTop:'100px'}}>
                {loading ? (
                    <Loading></Loading>
                ) : error ? (
                    <AlertMessage type="error">{error}</AlertMessage>
                ) : ( products.length === 0
                    ? (<AlertMessage type="info">There is no product</AlertMessage>)
                    :
                    (<Grid container spacing={3}>
                        
                        { products.map((product)=>{
                            return <Product key={product._id} product={product}/>
                        })}
                    </Grid>)
                )}
            </Container>
     
    )
}


