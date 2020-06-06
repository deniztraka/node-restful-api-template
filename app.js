"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import { MongoError } from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());

//routes
import itemsRoute from './routes/itemsRoute';
app.use('/',itemsRoute);

//routes
app.get("/",(req,res)=> {
    res.send("onlinee");
});

app.listen(3000,()=> {
    console.log("server is listening from port 3000");
});