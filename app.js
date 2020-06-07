"use strict";

import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import ValidationError from './services/validators/validationError';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());

//routes
import recordsRoute from './routes/recordsRoute';
app.use('/', recordsRoute);

//error handling middleware
app.use((err, req, res, next) => {    
    var responseObj = {};

    //check different type of errors
    if (err instanceof ValidationError) {
        res.status(400);
        responseObj.code = 400;
        responseObj.msg = "Please check your request payload.";        
    } else if(err){
        res.status(500);
        responseObj.code = 500;
        responseObj.msg = "We are having problems on our server now. Please try again later.";        
    }

    if(err){
        //log and return proper response
        console.log(err);
        return res.send({
            code: responseObj.code,
            msg: responseObj.msg
        });
    }
    next(err);
});

//routes
app.get("/", (req, res) => {
    res.send("online");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening");
});