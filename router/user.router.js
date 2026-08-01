// const express = require ('express');
// const usercontroller = require('../controller/user.controller');



import express from 'express';
import {requestOTP,registerUserWithSession,getUserDetails,deleteUserFromSession} from '../controller/user.controller.js';

// all requested  data will come here by body

const userrouter = express.Router();
export default userrouter;

// get the user details
userrouter.get ('/',getUserDetails);

// requets for get verifcation code for the user 
userrouter.post ('/login/request',requestOTP);


// request for verify the user and make a new session
userrouter.post ('/login/verify',registerUserWithSession);


// delete existing session
userrouter.post ('/logout',deleteUserFromSession);



// module.exports = userrouter