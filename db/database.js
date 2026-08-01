import {PrismaClient} from '../generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import {logger} from '../plog.js';


// database connection

const isDev = process.env.NODE_ENV === 'dev';

const host = isDev ? process.env.DB_HOST : process.env.P_DB_HOST;
const user = isDev  ? process.env.DB_USER : process.env.P_DB_USER;
const password = isDev ? process.env.DB_PASSWORD : process.env.P_DB_PASSWORD;
const database = isDev ? process.env.DB_DATABASE : process.env.P_DB_DATABASE;
const waitForConnections = isDev ? false : process.env.P_DB_WAIT_FOR_CONNECTION;
const connectionLimit = isDev ? 50 : process.env.P_DB_LIMIT;
const queueLimit = isDev ? 0 : process.env.P_DB_QUEUE;



// db adapter for connect with prisma
const adapter = new PrismaMariaDb({
    host,user,password,database,connectionLimit
});


const prisma = new PrismaClient({adapter});



// check database connection and log a timestamp

async function checkConnection(){
    try{
        const result = await prisma.$queryRaw`SELECT NOW() as time`;

        // console.log(result);

        logger.log({
            tag  : "#init",
            data : `${result[0].time} : database initilize.`,
        },process.env.DATABASE);
    }catch(e){

        logger.log({
            tag  : "testing",
            data : "Failed to start database!",
        });

        prisma.$disconnect();
        
    }
}



await checkConnection();


export default prisma;


