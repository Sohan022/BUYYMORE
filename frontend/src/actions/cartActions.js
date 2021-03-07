import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";


export const addToCart = (productid, qty) => async(dispatch, getState) => {
    const {data} = await Axios.get(`/product/${productid}`);
    dispatch({
        type:CART_ADD_ITEM,
        payload: {
            name : data.name,
            price : data.price,
            stock : data.stock,
            image : data.image,
            product : data._id,
            qty
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (productid) => async(dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productid});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ 
        type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  };