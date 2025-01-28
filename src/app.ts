import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import Routes from "./routes";
import { apiLimiter } from "./middleware/rateLimiter";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

// Routes
app.use("/api", Routes());

// Error Handling
app.use(errorHandler);

// Aplicar rate limiting a todas las rutas
app.use(apiLimiter);

export default app;
