import { Router } from "express";
import { 
  createMultiQuiz, 
  createQuiz, 
  deleteQuiz, 
  getQuizes, 
  updateQuiz 
} from "../controller/quiz/quizController";
import { authMiddleware } from "../middleware/authMiddleware";
import { 
  requirePermission,
  requireTeacherOrAbove,
  requireOwnershipOrAdmin
} from "../middleware/authorizationMiddleware";
import { PERMISSIONS } from "../enums/roles";

const router = Router();

const quizRoutes = (app: Router) => {
  app.use("/quiz", router);

  // Aplicar autenticación a todas las rutas de quiz
  router.use(authMiddleware);

  // Obtener quizzes - todos los usuarios autenticados
  router.get('/getAll', 
    requirePermission(PERMISSIONS.READ_QUIZ),
    getQuizes
  );

  // Crear quiz - solo teachers, moderators y admins
  router.post('/create', 
    requirePermission(PERMISSIONS.CREATE_QUIZ),
    createQuiz
  );

  // Crear múltiples quizzes - solo teachers, moderators y admins
  router.post('/createMulti', 
    requirePermission(PERMISSIONS.CREATE_QUIZ),
    createMultiQuiz
  );

  // Actualizar quiz - propietario, moderators y admins
  router.put('/update/:id', 
    requirePermission(PERMISSIONS.UPDATE_QUIZ),
    updateQuiz
  );

  // Eliminar quiz - propietario, moderators y admins
  router.delete('/delete/:id', 
    requirePermission(PERMISSIONS.DELETE_QUIZ),
    deleteQuiz
  );
};

export default quizRoutes;
