import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controller/category/categoryController";

const router = Router();

const categoryRoutes = (app: Router) => {
  app.use("/category", router);

  router.post("/create", createCategory);
  router.get("/get", getCategories);
  router.put("/update", updateCategory);
  router.delete("/delete", deleteCategory);
};

export default categoryRoutes;
