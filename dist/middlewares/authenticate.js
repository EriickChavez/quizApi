"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware to authenticate the user using it's JWT token
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your_jwt_secret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // @ts-ignore
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.default = authenticate;
