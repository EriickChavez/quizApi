import mongoose from "mongoose";
import mysql from "mysql2/promise";
import logger from "./logger";

// MongoDB Connection
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// MySQL Connection
export const connectMySQL = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    logger.info("MySQL connected");
    return connection;
  } catch (error) {
    logger.error("MySQL connection error:", error);
    process.exit(1);
  }
};
