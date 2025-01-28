import express, { Request, Response } from "express";
import Joi from "joi";

const router = express.Router();

const userSchema = Joi.object({
  username: Joi.string().min(6).required(),
});

// curl -X POST http://localhost:5005/validation/username
router.post("/username", (req: Request, res: Response) => {
  const { error } = userSchema.validate(req.body); // req.body structure: { username: 'john' }
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }
  res.json({ message: "Username is valid" });
});

export default router;
