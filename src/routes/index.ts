import { Router } from "express";
import authRoutes from "./authRoutes";

export default () => {
  const app = Router();

  authRoutes(app);

  return app;
};
