/*
 * File name    : plog.js
 * title        : p-LoG
 * description  : loging file in perfect manner on file or stdin
 * author       : SOUVIK SASMAL
 * date         : 26/09/2025
 */


//Dependencies
// const util = require('util');
// const {EventEmitter} = require ('events');
// const path = require('path');
// const fs_promise = require ('fs').promises;
// const fs = require('fs');


import util from 'util';
import { EventEmitter } from 'events';
import path from 'path';
import fs from 'fs';

let fs_promise = fs.promises;

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//Scafholding
const app = {}; // public

const _app = {};    // private

_app.logfile = path.join ( __dirname ,"/" , "log/");


if (!fs.existsSync(_app.logfile)){
    console.log("Log will print in stdout.\n");
    _app.logfile = null;
}

app.getAuthor = ()=>{
    return "Souvik Sasmal";
}

class LoggerEmmiter {

    #emitter;


    // all listeners name
    #DATA_LOG = "data-log";



    constructor (){

        this.#emitter = new EventEmitter();

        // all register listeners
        this.#emitter.on(this.#DATA_LOG,(logdata,filename)=>{
            _app.log(logdata,filename);
        })
    }
  

    log (log_value,tag_name, filename){
        data = {
            tag : tag_name,
            data : log_value,
        }
        if (filename)
            this.#emitter.emit(this.#DATA_LOG,data,_app.logfile+filename);
        else   
            this.#emitter.emit(this.#DATA_LOG,data)
    }


    log (data, filename){
        if (filename)
            this.#emitter.emit(this.#DATA_LOG,data,_app.logfile +filename);
        else
            this.#emitter.emit(this.#DATA_LOG,data);
    }
}




//Functions
app.logger = new LoggerEmmiter();

export const logger = app.logger;




// @params log_data : is and JSON object where the log information should in the data  memeber 
// log_data structure 
// log_data = {data : <logging message>,tag : "tag value"}
_app.log = async (log_data , filename)=>{

    // log_data is JSON based object 
    const time = new Date();
    const  timelog = `[${time.toLocaleDateString()} ${time.toLocaleTimeString("en-GB",{hour12:false})}.${String (Date.now()%1000).padStart(3,"0")}]`;
    
    let logdata = {};


    if (typeof (log_data) === "object"){
        logdata = {...log_data};
    }
    else{
        //NVL Scope : NOT VALID LOG
        logdata.data = "Not Valid Log";
        logdata.tag = "NVL"
    }

    // try to depricated
    //  logdata.data = logdata["data"] && logdata.data.length >0 ? logdata["data"] : "NO VALUE FOUND";


    logdata.data = logdata["data"] ? logdata["data"] : "NO VALUE FOUND";
    logdata.tag = logdata["tag"] && logdata.tag.length > 0 && logdata.tag.length <=25 ? logdata ["tag"] : "NTF";    // NTF : NO TAG FOUND 

    const data_log = String(timelog) + " [TAG : "+logdata.tag.padStart(25," ")+"] ["+ logdata.data+"]\n";

    if(_app.logfile && filename){
        // print in custom file
        try{
            await fs_promise.appendFile(filename,data_log,'utf-8');
        }catch (err){
            process.stderr.write("ERROR TO CREATE LOG\n");
        }
    }else{
        process.stdout.write(data_log);
    }



}



// print local time like digital clock
_app.timeLog = ()=>{

    setInterval(()=>{
        const time = new Date();
        timelog = `[${time.toLocaleDateString()} ${time.toLocaleTimeString("en-GB",{hour12:false})}.${String(Date.now()%1000).padStart(3,"0")}]`;
        process.stdout.write(util.format("\r%s",timelog));
    },50);


}



//Exports
// module.exports = app;
export default app;



