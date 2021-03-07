import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_REVIEWS_FAIL,
    PRODUCT_REVIEWS_SUCCESS,
    PRODUCT_REVIEWS_REQUEST
} from "../constants/productConstants";

export const productReducer = (state = {loading:true, products: []}, action) =>{
    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products:action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.message};
        default:
            return state;
    }
}

export const addProductReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_ADD_REQUEST:
            return {loading:true};
        case PRODUCT_ADD_SUCCESS:
            return {loading:false, product: action.payload};
        case PRODUCT_ADD_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

export const productDetailsReducer = (state = {loading:true}, action) =>{
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product:action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.message};
        default:
            return state;
    }
}

export const reviewProductReducer = (state = {}, action) =>{
    switch (action.type){
        case PRODUCT_REVIEWS_REQUEST:
            return {loading: true};
        case PRODUCT_REVIEWS_SUCCESS:
            return {loading:false, reviews:action.payload};
        case PRODUCT_REVIEWS_FAIL:
            return {loading: false, error: action.message};
        default:
            return state;
    }
}