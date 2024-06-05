import express from "express";
import { CounterModel } from "./Models/counter.model.js";
import counterRouter from "./routes/counter.routes.js"
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors())

app.use("/counter",counterRouter)

export {app}