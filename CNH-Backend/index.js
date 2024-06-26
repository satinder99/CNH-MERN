import dotenv from 'dotenv'
import {connectDB} from './db/index.js';
import { app,server } from './app.js';
dotenv.config()

const port = process.env.PORT || 4000;

connectDB()
.then(()=>{
    server.listen(port,()=>{
        console.log(`App is started and server is running at port : ${port}`);
    })
})
.catch((err)=>{
    console.log(`An error occured while starting the app : `,err);
})

