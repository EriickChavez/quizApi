import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById } from "../controller/category/categoryController";

const router = Router();

const categoryRoutes = (app: Router) => {
  app.use("/category", router);

  router.get('/all', getAllCategories);
  router.get('/:id', getCategoryById);
  router.post('/create', createCategory);
};

export default categoryRoutes;
