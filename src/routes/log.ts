import express, { Request, Response } from "express";
import logger from "../logger";

const router = express.Router();

// curl -X GET http://localhost:5005/api/logger
router.get("/", (req: Request, res: Response) => {
  logger.info("GET /log");
  res.json({ message: "The request has been logged in combined.log" });
});

export default router;
