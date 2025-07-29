import { Router } from "express";
import {
  login,
  register,
  getMe
} from "../controller/auth/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/authorizationMiddleware";
import { USER_ROLES } from "../enums/roles";

const router = Router();

const authRoutes = (app: Router) => {
  app.use("/auth", router);

  // Rutas públicas
  router.post('/register', register);
  router.post('/login', login);

  // Rutas protegidas
  router.get('/me', authMiddleware, getMe);
  
  // Registro con roles específicos (solo para admins)
  router.post('/register/admin', 
    authMiddleware, 
    requireRole(USER_ROLES.ADMIN), 
    register
  );
  
  router.post('/register/moderator', 
    authMiddleware, 
    requireRole(USER_ROLES.ADMIN), 
    register
  );
  
  router.post('/register/teacher', 
    authMiddleware, 
    requireRole([USER_ROLES.ADMIN, USER_ROLES.MODERATOR]), 
    register
  );

  // Funcionalidades futuras
  // router.post("/forgot-password", forgotPassword);
  // router.post("/reset-password", resetPassword);
};

export default authRoutes;
