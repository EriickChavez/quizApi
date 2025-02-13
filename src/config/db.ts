import mongoose from "mongoose";
import mysql from "mysql2/promise";
import logger from "../middleware/logger";
import { ENV } from "./ENV";

// MongoDB Connection
export const connectMongoDB = async () => {
  try {
    const uriMongo = ENV.MONGO_URI;
    await mongoose.connect(uriMongo);
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
      host: ENV.MYSQL_HOST,
      user: ENV.MYSQL_USER,
      password: ENV.MYSQL_PASSWORD,
      database: ENV.MYSQL_DATABASE,
    });
    logger.info("MySQL connected");
    return connection;
  } catch (error) {
    logger.error("MySQL connection error:", error);
    process.exit(1);
  }
};
