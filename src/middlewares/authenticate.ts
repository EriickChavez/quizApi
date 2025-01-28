require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate the user using it's JWT token
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret",
      (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        // @ts-ignore
        req.user = user;
        next();
      }
    );
  } else {
    res.sendStatus(401);
  }
};

export default authenticate;
