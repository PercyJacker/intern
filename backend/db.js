const mongoose = require("mongoose");

require('dotenv').config()



const DB_name = "profile";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_name}`);
        console.log(`\n mongo db is connected DB host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongodb connection error ", error);
        process.exit(1);
    }
};

module.exports = connectDB;
