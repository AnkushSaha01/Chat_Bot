import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import passport from "passport";
import configurePassport from "./config/passport.js";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

configurePassport(passport);

app.get("/health",(req,res)=>{
    res.json({message: "Server is running"});
})
app.use("/api/auth",authRouter);

export default app;