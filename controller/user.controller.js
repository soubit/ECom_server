// const db = require ('../lib/user.db');
// const db_cart  = require('../lib/cart.db');
// const session_util = require('../util/session.util');
// const {logger} = require ('../plog');
// const {client,script} = require ('../redis/database');



import {ensureUserId,getID} from '../lib/user.db.js';
import {copyCart} from '../lib/cart.db.js';
import {regenerateSession} from '../util/session.util.js';
import { logger } from '../plog.js';
import redis from '../redis/database.js';

const client = redis.client;
const script = redis.script;

// const usercontroller  = {};


export async function requestOTP (req,res,next){
    // Generate OTP for a mobile number
    // number validity is does not checking here

        
        const ph = req.body && req.body.ph ? req.body.ph : null;

        if (ph === null ){
            res.status (400).json({message : "no valid credential found!"});
            return;
        }


        const set_opt_in_redis = await client.evalSha(script.REQ_OTP,                                  
            {
                keys:[`otp:${ph}`,`otp_chance:${ph}`],
                arguments :['123456','3','300']
            }
        );
        if (set_opt_in_redis){
            res.status(201).json({message :"OTP send !"});
        }else{
            res.status(200).json({message :"already OTP is generated!"});
        }   
}




export async function registerUserWithSession (req,res,next){
    // otp match 
        // if chance is zero send wait attempt finish wait for sometime
        // if otp wrong send error and decreament the chance
    
    const ph = req.body && req.body.ph ? req.body.ph : null;
    const otp = req.body && req.body.otp ? req.body.otp : null;

    if (ph === null || otp === null){
        res.status (400).json({message : "no valid credential found!"});
        return;
    }

    const verify = await client.evalSha(script.OTP_VERIFY,
        {
            keys:[`otp:${ph}`,`otp_chance:${ph}`],
            arguments:[`${otp}`]
        }
    );

   
    if (verify === 0){
        res.status(401).json({message : "OTP is not valid"});
    }
    else{
        
        
        // new user created
        const guestcart = req.session.cart;

        try{
            await regenerateSession(req);

            // ensure user-id if the id will not exist then 
            // create a new user and return the id
            let id = await ensureUserId(req.body.ph);


            // copy all cart from eisting session if session alreday avilable
            copyCart(guestcart,id);

            // put user id in the new session 
            req.session.user = {id};
            res.status(201).json({message : "OTP validate"});

        }catch(err){
            
            throw err;
        }
       
    }

   

}


export async function getUserDetails  (req,res,next){
    try{
        if (req.session && req.session.user){
            
            const user = await getID(req.session.user.id);

            res.status(200).json(user);

        }else{
            res.status(401).json({message:"No user found!"});
            return;
        }
    }catch(err){
        throw err;
    }
}


export async function deleteUserFromSession  (req,res,next){
    // if session exists then delete it
    if (req.session){
        req.session.destroy((err)=>{
            if (err){
                res.status(500).json({message :"Logout Faild!"});
            }
            res.clearCookie('connect.sid');
            res.status(200).json({message : "Logged out!"});
        });
 
    }else{
        res.status(404).json({message : "No active session is avilable."});
    }
}

// module.exports = usercontroller;