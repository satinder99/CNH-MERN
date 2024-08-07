import express from "express";
import { CounterModel } from "./Models/counter.model.js";
import counterRouter from "./routes/counter.routes.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors";
import {Server} from "socket.io";
import http from "http"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/counter",counterRouter)
app.use("/user",userRouter)

/**
 * Socket io for events listening and updating counters in real time
 */
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})

io.on("connection",(socket)=>{

    socket.on("incrementNormal",(data)=>{
        io.emit("updateCounters",data)

    })
    socket.on("incrementEmergency",(data)=>{
        io.emit("updateCounters",data)
    })
    socket.on("decrementNormal",(data)=>{
        io.emit("updateCounters",data)
    })
    socket.on("decrementEmergency",(data)=>{
        io.emit("updateCounters",data)
    })
})
export {app,server}