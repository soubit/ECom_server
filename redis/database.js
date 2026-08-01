// const {createClient} = require ('redis');
// const {logger} = require('../plog');
// const scriptL = require ('./script/lua_loadder');



import { createClient } from 'redis';
import { logger } from '../plog.js';
import {requestOTP,verfiOTP} from './script/lua_loadder.js';


const redis = {};
redis.client = createClient();


const EXPIRE_CACHE = 300;   // seconds 


// Connect server with redis
redis.client.connect()
.then(()=>{
    logger.log({
        tag  : "#INIT",
        data : "Redis server started.",
    },process.env.REDIS);
    
})
.catch((err)=>{
     logger.log({
        tag  : "#FAILED",
        data : "Redis faild to open!",
    },process.env.REDIS);
});


redis.setCache = async (id,cache_string)=>{
    return await redis.client.set(id,cache_string,
        {condition :'NX',
            expiration:
            {type:'EX',value:EXPIRE_CACHE}
        }
    );
}


redis.isCache = async (id)=>{
    return await redis.client.get (id);
}


// All LUA script for the redis server 
redis.script = {};


(async ()=>{
    try{

        redis.script.REQ_OTP = await redis.client.scriptLoad(requestOTP);
        redis.script.OTP_VERIFY = await redis.client.scriptLoad(verfiOTP);
        
        logger.log({
            tag  : "#LUA-I",
            data : `lua script loaded!:${redis.script.REQ_OTP}`,
        },process.env.REDIS);

        logger.log({
            tag  : "#LUA-I",
            data : `lua script loaded!:${redis.script.OTP_VERIFY}`,
        },process.env.REDIS);
        
    }catch(err){
        logger.log({
            tag  : "#LUA-F",
            data : "LUA script code failed",
        },process.env.REDIS);
        
    }
})();

// module.exports = redis;
export default redis ;