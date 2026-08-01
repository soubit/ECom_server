// const db = require ('../db/database');
// const cart_manager = {};



import db from '../db/database.js';

// CRUD operation for the CART management

// C: Create a cart
// Guest cart structure 
// session.cart : {'id':qty}
export async function insertProductIntoCart (session,p_id){
    try{

        if (!session.user){

            // validate the product
            // the guest cart in the another database so valid for real db
            if(await db.executeQuery(`select id from product
                                    where id = ?`,[p_id],
                                    (r,f)=>{
                                        if(r && r.length){
                                            return r[0].id;
                                        }else{
                                            return 0;      // no product found
                                        }
                                    }) === p_id)
            {
                // product is valid
                

                if (!session.cart){
                    // if session.cart is not defined then define it first and then insert the new item
                    session.cart = {};
                    
                }

                // check if the product is already in cart 
                if(session.cart[p_id]){
                    // the product is already in cart
                    let qty = session.cart[p_id].qty;
                    if (qty && qty < 4){
                        session.cart[p_id] = {qty:qty + 1};
                        return 1;
                    }else{
                        return null;
                    }
                    
                }else{
                    // The product is not in the cart
                    session.cart[p_id] ={qty:1};
                    return 1;
                }


            }else{
              
                return null;
            }
        }
        
        else{
   
            let u_id = session.user.id ? session.user.id : 0;
            
            return await db.executeQuery(`insert into cart(u_id,p_id)
                                values(?,?)
                                on duplicate key 
                                update qty = qty + 1;`,[u_id,p_id],
                                (r,f)=>{
                                    // console.log(r);t
                                    return r.affectedRows;
                                });
        }
    }catch(err){
        throw err;
    }
}


// R: read all cart
// {id : {}}
export async function readCart (session) {
    try{
        if (!session.user){

            if (session.cart){
                let products =[];
                for (p_id of Object.keys(session.cart)){
                    products.push({
                        p_id:Number(p_id),
                        qty : session.cart[p_id].qty,
                    });
                }

                return products;
            }else{
                return [];
            }
        }else{
            const cart_value = {};
            await db.executeQuery(`select p_id,qty
                                    from cart
                                    where u_id = ?;`,[session.user.id],
                                    (r,f)=>{
                                        // @Future : apply some filter for production purpose
                                        // console.log(session.id,r);
                                        cart_value.products = r;
                                    
                                    });
            return cart_value.products;
        }

    }catch(err){
        throw err;
    }
}




// U: update the quentity
// if return >0 then row updated and if 0 then no update
export async function removeProductFromCart (session,p_id) {
    try{
        if (!session.user){

            let qty = session.cart && session.cart[`${p_id}`] ? session.cart[`${p_id}`].qty : -1;


            // product is not found 
            if (qty > 1 && qty <=4){

                session.cart[`${p_id}`] = {qty : qty -1};
                return 1;
            }else{
                return 0;
            }
            
        }
        else{
            
            let u_id = session.user.id ? session.user.id : 0;

            return await db.executeQuery(`update cart
                                        set qty = qty-1
                                        where u_id = ? and p_id = ? and qty > 1;`,[u_id,p_id],
                                (r,f)=>{
                                    return r.affectedRows;
                                });
        }
    }catch(err){
        throw err;
    }
} 


// D : delete product from the cart

export async function dropProductFromCart (session,p_id) {
    try{
        if (!session.user){
            if (session.cart && session.cart[`${p_id}`]){
                delete session.cart[`${p_id}`];
                return 1;
            }else{
                return 0;
            }
        }else{

            let u_id = session.user.id ? session.user.id : 0;
            return await db.executeQuery(`delete from cart
                                    where u_id = ? and p_id = ?`,[u_id,p_id],
                                    (r,f)=>{
                                        return r.affectedRows;
                                    });
        }
    }catch(err){
        throw err;
    }
}




// copy cart from the session to home cart 
// fun only required cart not session based
export async function copyCart(cart,u_id){
    if (cart){
        
       for(const p_id of Object.keys(cart)){
        if (await db.executeQuery(`insert into cart (u_id, p_id, qty)
                                   values (?,?,?) as new
                                   on duplicate key
                                   update cart.qty = LEAST(cart.qty + new.qty,4);`,[u_id,p_id,cart[p_id].qty],
            (r,f)=>{return r.affectedRows} ) !==1)
        {
            return 0;
        }

       }
       return 1;
    }

    return 0;
}

// module.exports = cart_manager;