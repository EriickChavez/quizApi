import { Router } from "express";
import {
  createMultiQuestion,
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  getQuestionsByCategory,
  updateQuestion,
} from "../controller/question/questionController";

const router = Router();

const questionRoutes = (app: Router) => {
  app.use("/question", router);

  router.post("/create", createQuestion);
  router.post("/createMulti", createMultiQuestion);
  router.get("/get", getQuestions);
  router.put("/update", updateQuestion);
  router.delete("/delete", deleteQuestion);
  router.get("/get/:id", getQuestionById);
  router.get("/get/category/:id", getQuestionsByCategory);
};

export default questionRoutes;
