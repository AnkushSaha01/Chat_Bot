import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import config from "./src/config/config.js";


connectDB()
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});