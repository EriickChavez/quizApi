import { Router } from "express";
import { getAllCategories, getCategoryById } from "../controller/category/categoryController";

const router = Router();

const categoryRoutes = (app: Router) => {
  app.use("/category", router);

  router.get('/all', getAllCategories);
  router.get('/:id', getCategoryById);
};

export default categoryRoutes;
