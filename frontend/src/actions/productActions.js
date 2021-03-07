import Axios from "axios";
import { 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_REVIEWS_REQUEST,
    PRODUCT_REVIEWS_SUCCESS,
    PRODUCT_REVIEWS_FAIL
} from "../constants/productConstants";


export const listProducts = () => async(dispatch) =>{
    dispatch({type: PRODUCT_LIST_REQUEST});
    try{
        const {data} = await Axios.get('/product/allproduct');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

export const detailsProduct = (productid) => async(dispatch) => {
    dispatch({type:PRODUCT_DETAILS_REQUEST});
    try{
        
        const {data} = await Axios.get(`/product/${productid}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});   
    }
    catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const addProduct = (data) => async(dispatch,getState) =>{
    dispatch({type:PRODUCT_ADD_REQUEST, payload:data});
    try{
        const {
            userLogin: { userInfo },
          } = getState();
        const {product} = await Axios.post(`/product/${userInfo._id}/addproduct`,data);
        dispatch({type:PRODUCT_ADD_SUCCESS,dispatch:product});
    }
    catch(error){
        dispatch({
            type: PRODUCT_ADD_FAIL, 
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const reviewProduct = (productid,review) => async(dispatch,getState) =>{
    dispatch({type:PRODUCT_REVIEWS_REQUEST, payload:review});
    try{
        const {
            userLogin: { userInfo },
          } = getState();
        const {reviews} = await Axios.put(`/product/${productid}/${userInfo._id}/review`,review, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
        dispatch({type:PRODUCT_REVIEWS_SUCCESS,dispatch:reviews});
        const {data} = await Axios.get(`/product/${productid}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({
            type: PRODUCT_REVIEWS_FAIL, 
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}