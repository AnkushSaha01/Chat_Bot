import { config } from "dotenv";

config();

if(!process.env.JWT_SECRET || !process.env.MONGO_URL ){
    throw new Error("Please provide all the environment variables");
}

const _config = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    jwt_secret: process.env.JWT_SECRET,    
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  }

export default Object.freeze(_config);