require("dotenv").config();
const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URL, {
            bufferCommands: false,
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        cached.promise = null;
        throw error;
    }

    return cached.conn;
};

module.exports = connectDB;

    

