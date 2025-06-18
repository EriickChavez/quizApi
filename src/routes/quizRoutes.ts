import { Router } from "express";
import { createMultiQuiz, createQuiz, deleteQuiz, getQuizes, updateQuiz } from "../controller/quiz/quizController";


const router = Router();

const quizRoutes = (app: Router) => {
  app.use("/quiz", router);

  router.get('/getAll', getQuizes);
  router.post('/create', createQuiz);
  router.post('/createMulti', createMultiQuiz);
  router.put('/update/:id', updateQuiz);
  router.delete('/delete/:id', deleteQuiz)
};

export default quizRoutes;
