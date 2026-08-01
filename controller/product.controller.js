// cotroller ( handler) for product router

// const db = require ('../lib/product.db');
// const {logger} = require ('../plog');
// const redis = require ('../redis/database');

// const productcontroller = {};



import {getListOfProduct,getSingleProduct,getListOfProduct_Optimized_} from '../lib/product.db.js';
import { logger } from '../plog.js';
import redis from '../redis/database.js';


export async function singleProduct (req,res,next){
    try{
        let id = req.params.id > 0 ? req.params.id : null;
        if (!id){
            res.status(400).json ({message : "id must be greater then zero"});
            return;
        }
        const product = await getSingleProduct(id);

        res.status(200).json (product);
    }catch (err){

        logger.log({
            tag  : "#DATABASE-1",
            data : `${err} : <controller/product.controller.js/singleProduct()> `,
        },process.env.DATABASE); 
         
            
        res.status(500).json({message:'Internal Server Error.'});
        
    }
}



export async function productList  (req,res,next){
    
    

    if (!(req.query.page && req.query.limit)){
        // throw new Error ('user not give query parameter-api : products/');
        res.status(400).json({message:'input query parameter page & limit is not found.'})
    }
    else{
        try{
            let page = Number(req.query.page);
            let limit = Number(req.query.limit);

            if ((!page ||  !limit ) || page <=0){
                res.status (400).json({message : 'query must be integer or page must be greater then zero'});
                return;
            }

            // console.log(req.url);
            
            let list = await redis.isCache(`productview:${req.url}`)

            if (!list){

                list = await getListOfProduct(page,limit);
                await redis.setCache (`productview:${req.url}`,JSON.stringify(list));
            }else{
                list = JSON.parse(list);
            }

            res.status(200).json(list);

        }catch(err){
            console.log(err);
            logger.log({
                tag  : "#DATABASE-1",
                data : `${err} : controller/product.controller.js/productList()`,
            },process.env.DATABASE); 

            res.status(500).json({message:'Internal Server Error.'});
        }
    }
}




// new update api of #1 api of get list of product
export async function productList_opti_ (req,res,next){
    if (req.query.last){
        const lastvisit = Number(req.query.last);

        if (lastvisit === null){
            res.status(400).json({message:"not a valid parameter in the query."});
            return;
        }


        // const list = await db.getListOfProduct_Optimized_(lastvisit);
           let list = await redis.isCache(`productview:${req.url}`)

            if (!list){

                list = await getListOfProduct_Optimized_(lastvisit);
                await redis.setCache (`productview:${req.url}`,JSON.stringify(list));
            }else{
                list = JSON.parse(list);
            }

            res.status(200).json(list);


    }else{
        res.status(400).json({message:"not a valid query."});
    }
}

// module.exports = productcontroller;