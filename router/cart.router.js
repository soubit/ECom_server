
// All kinds of product router level setup will here

// const express = require ('express');
// const cartcontroller = require('../controller/cart.controller');


import express from 'express';
import {insertNewProduct,getCart,updateCart,deleteProduct} from '../controller/cart.controller.js';


const cartrouter = express.Router();
export default cartrouter;

// read all product from the cart
// it will read cart from guest session or home session 
cartrouter.get('/',getCart);


// insert product in the cart
cartrouter.post('/:id',insertNewProduct);


// update qty in cart 
cartrouter.put('/:id',updateCart);


// delete item in the cart 
cartrouter.delete('/:id',deleteProduct);


// module.exports = cartrouter;