import express from 'express';
const router = express.Router();
import {isAuth} from '../middleware/authStatus.js';

import {
    allProductHandler,
    productDetailsHandler,
    addProductHandler,
    reviewsHandler
} from '../handlers/productHandler.js';

router.get('/allproduct',allProductHandler);
router.get('/:id',productDetailsHandler);
router.post('/:userid/addproduct',addProductHandler);
router.put('/:productid/:userid/review',isAuth,reviewsHandler)

export { router as default };