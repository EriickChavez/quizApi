import { Router } from "express";
import { createQuiz, getQuizzes } from "../controller/quiz/quizController";

const router = Router();

const questionRoutes = (app: Router) => {
  app.use("/question", router);

  router.get('/get', getQuizzes);
  router.post('/create', createQuiz);

  // router.post("/create", createQuestion);
  // router.post("/createMulti", createMultiQuestion);
  // router.get("/get", getQuestions);
  // router.get("/filter", getQuestionsByFilter);
  // router.put("/update", updateQuestion);
  // router.delete("/delete", deleteQuestion);
  // router.get("/get/:id", getQuestionById);
  // router.get("/get/category/:id", getQuestionsByCategory);
};

export default questionRoutes;
