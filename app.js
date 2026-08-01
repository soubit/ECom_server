
/**
 * Name : E-Commerce
 * Programmer(Backend) : Souvik Sasmal 
 * Date : 23rd July 2025
 * Description : A main source file for handel all api request
 */


// OLD JS require file

// const express = require('express');
// const dotenv = require('dotenv');
// const db = require('./db/database');
// const {logger} = require ('./plog');
// const {validRequest,defaultError} = require ('./middleware/common/common');
// const productrouter = require('./router/product.router');
// const cartrouter = require('./router/cart.router');
// const userrouter = require ('./router/user.router');
// const cookie_parser = require ('cookie-parser');
// const session = require('express-session');
// const {RedisStore} = require('connect-redis');
// const {client} = require('./redis/database');


//Dependencies

import express from 'express';
import './util/env.js';

// import db from './db/database.js';
import prisma from './db/database.js';

import {logger} from './plog.js'

import {validRequest,defaultError} from './middleware/common/common.js'


import productrouter from './router/product.router.js';
import cartrouter from './router/cart.router.js';
import userrouter  from './router/user.router.js';


import session from 'express-session';
import { RedisStore } from 'connect-redis';
import redis from './redis/database.js';

const client = redis.client;


//create the Express app for the project 
// The root app where all router will be marged
const app = express();




// data base configire
// const DATABASE ={};
// const isDev = process.env.NODE_ENV === 'dev';

// DATABASE.host = isDev ? process.env.DB_HOST : process.env.P_DB_HOST;
// DATABASE.user = isDev  ? process.env.DB_USER : process.env.P_DB_USER;
// DATABASE.password = isDev ? process.env.DB_PASSWORD : process.env.P_DB_PASSWORD;
// DATABASE.database = isDev ? process.env.DB_DATABASE : process.env.P_DB_DATABASE;
// DATABASE.waitForConnections = isDev ? false : process.env.P_DB_WAIT_FOR_CONNECTION;
// DATABASE.connectionLimit = isDev ? 50 : process.env.P_DB_LIMIT;
// DATABASE.queueLimit = isDev ? 0 : process.env.P_DB_QUEUE;



//connect with database
// (async () => {
//     if (db.connect({...DATABASE})){
//         try{
//             await db.executeQuery("SELECT NOW() AS starttime",[],(rows)=>{
//                 logger.log({
//                     tag  : "#INIT",
//                     data : `${rows[0].starttime} : Database initilize`,
//                 },'database');
//             })
//         }catch(err){
//             logger.log({
//                 tag  : "main-app",
//                 data : err,
//             },process.env.DATABASE);
            
//         }
// }else{
//     logger.log({
//         tag  : 'FAILED',
//         data : 'Connection failed with the database ',
//     },process.env.DATABASE);
        
// }
// })();


// middleware
app.use (express.json());





// Session Setup
app.use(session({
    secret: process.env.token_key,
    resave : false,
    saveUninitialized :false,
    cookie: {maxAge  : 300 * 1000},
    store : new RedisStore({client})
}));


app.use(validRequest);  // check the request is valid for JSON validation and others




// router
// Products Router
app.use('/api/products',productrouter);

// User Router
app.use('/api/user',userrouter);

// Cart Router
app.use('/api/cart',cartrouter);




//default error handler
app.use(defaultError);   



//port listen
const listening_port = process.env.NODE_ENV === 'dev'? process.env.PORT : process.env.P_PORT;

app.listen(listening_port,()=>{
    logger.log({
        tag  : "#INIT",
        data : `Server start listening on ${listening_port}`,
    },process.env.SERVER);
    
})




