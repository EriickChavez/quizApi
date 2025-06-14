import { Router } from "express";
import authRoutes from "./authRoutes";
import quizRoutes from "./quizRoutes";
import categoryRoutes from "./categoryRoutes";

export default () => {
  const app = Router();

  authRoutes(app);
  quizRoutes(app);
  categoryRoutes(app);

  return app;
};
