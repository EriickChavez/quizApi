import { Router } from "express";
import { createCategory, createMultiCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controller/category/categoryController";

const router = Router();

const categoryRoutes = (app: Router) => {
  app.use("/category", router);

  router.get('/all', getAllCategories);
  router.get('/:id', getCategoryById);
  router.post('/create', createCategory);
  router.post('/createMulti', createMultiCategory);

  router.put('/update/:id', updateCategory);
  router.delete('/delete/:id', deleteCategory)
};

export default categoryRoutes;
