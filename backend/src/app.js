import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use("/api/v1/user", userRouter);
 
export {app};