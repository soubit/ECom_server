
// All kinds of product router level setup will here

// const express = require ('express');
// const productcontroller = require('../controller/product.controller');


import express from 'express';
import {productList,productList_opti_,singleProduct} from '../controller/product.controller.js';


const productrouter = express.Router();
export default productrouter;


// optimized api for get list of product of #1 api
productrouter.get('/new/',productList_opti_);


// get the single product specification using the product id
productrouter.get('/:id',singleProduct);


// get the list of prodcts in server
productrouter.get('/',productList);







// module.exports = productrouter;