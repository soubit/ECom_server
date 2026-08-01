// const fs = require('fs');
// const path = require ('path');

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadLua (filename){
    return fs.readFileSync(
        path.join(__dirname,filename),
        "utf-8"
    );
}


export const requestOTP = loadLua('request_otp.lua');
export const verfiOTP = loadLua('verify_otp.lua');

// module.exports ={
//     requestOTP : loadLua("request_otp.lua"),
//     verifyOTP : loadLua("verify_otp.lua")
// }