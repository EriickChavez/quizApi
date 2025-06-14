import { Router } from "express";
import {
  login,
  register,
} from "../controller/auth/authController";

const router = Router();

const authRoutes = (app: Router) => {
  app.use("/auth", router);

  router.post('/register', register);
  router.post('/login', login);

  // router.post("/forgot-password", forgotPassword);
  // router.post("/reset-password", resetPassword);
};

export default authRoutes;
