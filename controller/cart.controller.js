// const db = require ('../lib/cart.db');
// const {logger} = require ('../plog');
// const cartcontroller = {};


import {insertProductIntoCart,readCart,removeProductFromCart,dropProductFromCart} from '../lib/cart.db.js';
import {logger} from '../plog.js';


// insert any item in the cart at a time one cart will be there
export async function insertNewProduct (req,res,next) {
    
    const product_id = Number(req.params.id) > 0 ? Number(req.params.id) : null;

    if (!product_id){
        res.status(400).json({messgae:"Product id is not valid."});
    }

    try{
    
        if (req.session){


            let update_row = await insertProductIntoCart(req.session,product_id);

            if (update_row > 0){

                res.status(200).json({messgae:"Product sucessfuly put into cart."});

            }else{

                res.status(400).json({message : "product is not sucessfuly cart!."});
            }

        }else{
            res.status(404).json({message : "No session is avilable!"});
        }
        
    }catch(err){
        if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED'){
            res.status(400).json({message : "maximum quantity reached."});
        }else{
            throw err;
        }
    }
}



// get list of product in the cart
export async function getCart (req,res,next) {
    try{
        if (req.session){
            let cart = await readCart(req.session);
            res.status(200).json(cart);
        }else{
            res.status(404).json({message : "No session is avilable!"});
        }
    }catch(err){
        throw err
    }
}





// update the qty of any product
export async function updateCart  (req,res,next) {
    const p_id = Number(req.params.id);



    if (!Number.isInteger(p_id)){
        res.status(400).json({message : "Invalid Product ID."});
        return;
    }

    
    try{

        if (req.session){
            let update = await removeProductFromCart(req.session,p_id);

            if(update === 0){
                res.status(404).json({message:"Remove product from cart is unsucessful."});
                return;
            }

            res.status(200).json({message:"Remove product sucessfuly."});

        }else{

            res.status(404).json({message : "No session is avilable!"});
        }
    }catch(err){
        if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED'){
            res.status(400).json({message:"Quantity numebr is invalid."})
        }else{
            throw err;
        }
    }
}







// delete product from the cart
export async function deleteProduct (req,res,next){

    const p_id = Number(req.params.id);

    if (!Number.isInteger(p_id)){
        res.status(400).json({message : "Product id is not valid."});
        return;
    }


    try{
        let deleted = await dropProductFromCart(req.session ,p_id);
        
        if (deleted > 0){
            res.status(200).json({message:"Delete product sucessful."});
        }else{
            res.status(404).json({message : "Delete product unsucessful."});
        }
    }catch(err){
        throw err;
    }
}

// module.exports = cartcontroller;

