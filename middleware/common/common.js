

// const {logger} = require('../../plog');
// const middlewere = {};

import {logger} from '../../plog.js';


//check if the requesr is valid or not
// 406 => Not Acceptable
// rest of this method all are send  data in json format

export function validRequest (req,res,next){
    // it is a common middlewere that can assure is the request is valid or not 
    
    if ( (req.headers['content type'] ? req.headers['Content-Type'] === 'appliation/json' : true) && req.accepts('application/json')){
        next(); // good request
    }else{
        switch (req.accepts(['json','html','text'])){
            case 'json' :
                res.status(406).json ({message : "Not Acceptable"});
                break;
            case 'html' :
                res.status (406).send(
                    `<html>
                        <head>
                            <title>
                                Bad Request
                            </title>
                        </head>
                        <Body>
                            <p>
                                <h1>Not Acceptable</h1>
                            </p>
                            <hr>
                            <p>
                                Please check the website/server manual for best use. Thank You 😀

                            </p>
                            <p>
                                &copy; MaVi ${process.env.YEAR}
                            </p>
                        </Body>
                    </html>`
                )
                    break;
                case 'text':
                    res.status (406).send ('Not Acceptable');
                    break;
                default :
                    res.status (400).send ("Not Acceptable");
                    
        }
    }
}



// common error handler 
// 500 = > internal server error
export function defaultError (err,req,res,next){
   if (process.env.NODE_ENV==='dev'){
    console.log(err);
   }
   
    logger.log({
        tag  : "#DEFAULT-ERR",
        data : err.message,
    },process.env.UNEXPECTED);
    
    res.status(500).json({message : "Internal server error!"});
}


// module.exports = middlewere;
// export default middlewere;