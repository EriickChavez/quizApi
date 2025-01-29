import { Router } from "express";
import authRoutes from "./authRoutes";
import questionRoutes from "./questionRoutes";

export default () => {
  const app = Router();

  authRoutes(app);
  questionRoutes(app);

  return app;
};
