"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
/**
 * Middleware to disable the route
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const disabled = (req, res, next) => {
    res.sendStatus(403);
};
exports.default = disabled;
