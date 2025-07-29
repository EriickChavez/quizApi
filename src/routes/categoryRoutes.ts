import { Router } from "express";
import { 
  createCategory, 
  createMultiCategory, 
  deleteCategory, 
  getAllCategories, 
  getCategoryById, 
  updateCategory 
} from "../controller/category/categoryController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requirePermission } from "../middleware/authorizationMiddleware";
import { PERMISSIONS } from "../enums/roles";

const router = Router();

const categoryRoutes = (app: Router) => {
  app.use("/category", router);

  // Aplicar autenticación a todas las rutas de category
  router.use(authMiddleware);

  // Obtener todas las categorías - todos los usuarios autenticados
  router.get('/all', 
    requirePermission(PERMISSIONS.READ_CATEGORY),
    getAllCategories
  );

  // Obtener categoría por ID - todos los usuarios autenticados
  router.get('/:id', 
    requirePermission(PERMISSIONS.READ_CATEGORY),
    getCategoryById
  );

  // Crear categoría - teachers, moderators y admins
  router.post('/create', 
    requirePermission(PERMISSIONS.CREATE_CATEGORY),
    createCategory
  );

  // Crear múltiples categorías - teachers, moderators y admins
  router.post('/createMulti', 
    requirePermission(PERMISSIONS.CREATE_CATEGORY),
    createMultiCategory
  );

  // Actualizar categoría - moderators y admins
  router.put('/update/:id', 
    requirePermission(PERMISSIONS.UPDATE_CATEGORY),
    updateCategory
  );

  // Eliminar categoría - moderators y admins
  router.delete('/delete/:id', 
    requirePermission(PERMISSIONS.DELETE_CATEGORY),
    deleteCategory
  );
};

export default categoryRoutes;
