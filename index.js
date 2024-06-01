import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './db/index.js';

const app = express()
dotenv.config()

const port = process.env.PORT || 4000;

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`App is started and server is running at port : ${port}`);
    })
})
.catch((err)=>{
    console.log(`An error occured while starting the app : `,err);
})