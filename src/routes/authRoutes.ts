import { Router } from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signup,
} from "../controller/auth/authController";

const router = Router();

const authRoutes = (app: Router) => {
  app.use("/auth", router);

  router.post("/signup", signup);
  router.post("/login", login);
  router.post("/forgot-password", forgotPassword);
  router.post("/reset-password", resetPassword);
};

export default authRoutes;
