import { NextFunction, Request, Response } from "express";

require("dotenv").config();

/**
 * Middleware to disable the route
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const disabled = (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(403);
};

export default disabled;
