import { Router } from "express";
import {
  createCategory,
  createMultiCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controller/category/categoryController";

const router = Router();

const categoryRoutes = (app: Router) => {
  app.use("/category", router);

  router.post("/create", createCategory);
  router.post("/createMulti", createMultiCategory);
  router.get("/get", getCategories);
  router.put("/update", updateCategory);
  router.delete("/delete", deleteCategory);
};

export default categoryRoutes;
