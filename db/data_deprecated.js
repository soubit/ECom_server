// A helper file for smart database connection


// const mysql = require ('mysql2/promise');


import mysql from 'mysql2/promise';

const handler = {};
const _helper = {}; // private

_helper.init = false;
_helper.pool = false;


handler.getAuthor = ()=>{
    return "Souvik Sasmal";
}


// @TODO  : the basic validator code is written modify in future
_helper.validateQuery = (suspectqueary)=>{

    if (typeof (suspectqueary) === 'string' && suspectqueary.trim().length > 0){
        return suspectqueary;
    }else{
        return false;
    }
}



handler.connect = (connection= null)=>{
    if (!_helper.init){
        // if not start then starting procedure is starting

        if (connection == null){
            // if external connection information is not given 
            _helper.pool =  mysql.createPool({
                host:'localhost',
                user : 'root',
                password : 'root',
                database : 'maviproject',
            });
        }else{
            _helper.pool = mysql.createPool(connection);
        }
        _helper.init = true;
        return true;    // connection is established now!
    }else{
        return false;   // connection is already established!
    }
}


// close the connection for pool
handler.closeConnection = async()=>{
    try{
        await _helper.pool.end();
        _helper.init = false ; // connection is close
        return true;    // connection close successfully
    }catch(err){
        return false;   // connection is not shutting dow
    }
}



handler.isOnline = () =>{
    return _helper.init;
}


//useful for transection level query 
handler.getSingleConnection  = async()=>{
    try{
        connection = await _helper.pool.getConnection();
        return connection;
    }catch (err){
        return false;   // failed to fetch single connection 
    }
}



// revoke the connection from the query 
handler.closeSingleConnection = (connection = null)=>{   
    if (connection){
        connection.release();
        return true;    // connection is get back to pool
    }else{
        return false;   // connection is already empty
    }
}

handler.executeQuery = async (quary ,param=[], modifiedCallback=null )=>{
    const validqueary = _helper.validateQuery(quary);
    if (validqueary){
        try{
            const [rows,fields] = await _helper.pool.execute(validqueary,param);
            
            if (modifiedCallback){
                if (typeof (modifiedCallback) === 'function'){
                    return modifiedCallback(rows,fields);  // modified callback will be given by the dev 
                }else{
                    throw new Error ('Callback function for database query type is not valid.')
                }
            }
            //according the callback new filtere data will return
        }catch(err){
            throw err // connection execution porblem
        }
    }else{
        throw new Error ('SQL Query Validation Failed.');  // quary has some problem
    }
}




_helper.gracefulShutdown = async () => {
    console.log('\nShutting down gracefully database connection...');
    if (await handler.closeConnection()){
        console.log("connection close for database")
    }
    process.exit(0);
};

// handle signals
process.on('SIGINT', _helper.gracefulShutdown);      // Ctrl+C
process.on('SIGTERM', _helper.gracefulShutdown);     // kill command
process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    await _helper.gracefulShutdown();
});

// when by default exit
process.on('beforeExit', async () => {
    await handler.closeConnection();
});

// module.exports = handler;
export default handler;

