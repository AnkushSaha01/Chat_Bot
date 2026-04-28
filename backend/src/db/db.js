import mongoose from "mongoose";
import Config from "../config/config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(Config.mongo_url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection error: ", error);
        process.exit(1);
    }
}   

export default connectDB;