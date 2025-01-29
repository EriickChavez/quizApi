import { Router } from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../controller/auth/questionController";

const router = Router();

const questionRoutes = (app: Router) => {
  app.use("/question", router);

  router.post("/create", createQuestion);
  router.get("/get", getQuestions);
  router.put("/update", updateQuestion);
  router.delete("/delete", deleteQuestion);
  router.get("/get/:id", getQuestionById);
};

export default questionRoutes;
