import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  MYSQL_HOST: process.env.MYSQL_HOST || "",
  MYSQL_USER: process.env.MYSQL_USER || "",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
};
