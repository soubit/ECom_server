
// const db = require ('../db/database');
// const user_db = {};



import db from '../db/database.js';

// procedure for creating new session(user)
// no delete user is avilabe right now
// only create and read the user


// create a new user(C+R)
export async function ensureUserId (ph_no){
    return await db.executeQuery(`INSERT INTO user (ph_no)
                                  VALUES (?)
                                  ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,[ph_no],
                                  
                                  (r,f)=>{return r.insertId});


}


export async function getID  (id){
    return await db.executeQuery(`select id,ph_no
                                  from user 
                                  where id = ?;`,[id],

                                  (r,f)=>{return r[0];}
        );
}

// read all data for the user(R)
export async function readUser  (session){
    
}


// module.exports = user_db;