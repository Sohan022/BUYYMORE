import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_ALL_FAIL,
    ORDER_ALL_REQUEST,
    ORDER_ALL_SUCCESS,
  } from '../constants/orderConstants';
  
  export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true };
      case ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, order: action.payload };
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

export const allOrderReducer = (state = {loading:true,allorder:[]}, action) => {
    switch (action.type) {
      case ORDER_ALL_REQUEST:
        return { loading: true };
      case ORDER_ALL_SUCCESS:
        return { loading: false, success: true, allorder: action.payload };
      case ORDER_ALL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };