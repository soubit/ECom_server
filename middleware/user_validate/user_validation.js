const jwt = require ('jsonwebtoken')
// const session_manager = require('../../lib/session.db');
const {logger} = require ('../../plog');



//under-construction 


const validation ={};

// const Redis = require ('ioredis');
// const client = new Redis();


// Session expire time
// const session_expire_time = Number(process.env.SESSION_EXPIRE); 
const session_expire_time = 7 * 24 * 60 * 60;

function generateUniqueId(){
    let epoc = Date.now();  // mili sec time
    let rand = Math.ceil(Math.random() * 10000);

    return epoc.toString() + rand.toString();

}

// api timer for all kind of user 
// this is vlidate through the jwt
// current time rate





validation.api_timer_validator = async (req,res,next)=>{

    
   next();





    
}



module.exports=validation;