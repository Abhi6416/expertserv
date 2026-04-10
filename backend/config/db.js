/**
 * config/db.js — MongoDB Connection
 * -----------------------------------
 * Uses Mongoose to connect to MongoDB Atlas (or local MongoDB).
 * The connection URI is read from the MONGODB_URI environment variable.
 *
 * 👇 To configure:
 *    Set MONGODB_URI in your .env file, e.g.:
 *    MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/expertserv
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Mongoose connection options for stable connections
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit process with failure so the server doesn't run without DB
    process.exit(1);
  }
};

module.exports = connectDB;
