import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, allOrderReducer } from './reducers/orderReducers';
import {
    addProductReducer,
    productDetailsReducer, 
    productReducer,
    reviewProductReducer
} from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo'))
          : null,
      },
    cart:{
        cartItems: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod:'Prepaid'
    }
};
const reducer = combineReducers({
    product : productReducer,
    productDetails : productDetailsReducer, 
    addProduct: addProductReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    orderCreate : orderCreateReducer,
    allOrder: allOrderReducer,
    reviews:reviewProductReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;