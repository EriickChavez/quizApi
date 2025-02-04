import { Router } from "express";
import authRoutes from "./authRoutes";
import questionRoutes from "./questionRoutes";
import categoryRoutes from "./categoryRoutes";

export default () => {
  const app = Router();

  authRoutes(app);
  questionRoutes(app);
  categoryRoutes(app);

  return app;
};
