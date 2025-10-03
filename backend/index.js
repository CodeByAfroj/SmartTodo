import express from "express"
import route from "./routes/todoRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import "./scheduler.js";

import './nodemailer.js'

const app = express();
dotenv.config();




const PORT=process.env.PORT||5000;
const MONGO_URL=process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Database connected")

    app.listen(PORT,()=>{
        console.log(`server running at port ${PORT}`)
    })
})
.catch((error)=>console.log(error));



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api",route)