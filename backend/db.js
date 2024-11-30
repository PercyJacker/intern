const mongoose = require("mongoose");

require('dotenv').config()



const DB_name = "profile";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://percyjacker2002:percyjr2002@cluster0.e5xjn.mongodb.net/${DB_name}`);
        console.log(`\n mongo db is connected DB host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongodb connection error ", error);
        process.exit(1);
    }
};

module.exports = connectDB;
