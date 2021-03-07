import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_ALL_FAIL,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/order/placeorder', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allOrders = () => async(dispatch,getState) =>{
    dispatch({type:ORDER_ALL_REQUEST,});
    try{
      const {
        userLogin: { userInfo },
      } = getState();
        const {data} = await Axios.get(`/order/allorder/${userInfo._id}`,{
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({type:ORDER_ALL_SUCCESS,payload:data});
    }
    catch (error) {
        dispatch({
          type: ORDER_ALL_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
}
