"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db/db"));
const runtime_1 = __importDefault(require("../runtime/runtime"));
require("dotenv").config();
/**
 * UserHandler class to handle user registration and login.
 */
class UserHandler {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
        this.saltRounds = 10;
    }
    /**
     * Register a new user with a username and password.
     * @param {string} username - The username of the user. It must have the 'unique' constraint in the database to avoid duplicates.
     * @param {string} password - The password of the user.
     * @returns {Promise<string>} - A promise that resolves to a JWT token.
     * @throws {Error} - If the registration fails.
     * @example
     * const token = await userHandler.registerUser('testuser', 'testpassword');
     */
    registerUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield runtime_1.default.hash(password, this.saltRounds);
            const result = yield db_1.default.functions.insertRow("users", {
                username,
                password: hashedPassword,
            });
            if (result.affectedRows === 0)
                throw new Error("Failed to register user");
            const token = jsonwebtoken_1.default.sign({ id: process.env.HIDE_USERID ? null : result.insertId, username }, this.jwtSecret, { expiresIn: "7d" });
            return token;
        });
    }
    /**
     * Log in a user with a username and password.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<string>} - A promise that resolves to a JWT token.
     * @throws {Error} - If the login fails.
     * @example
     * const token = await userHandler.loginUser('testuser', 'testpassword');
     */
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.default.functions.getRow("users", { username });
            if (user.length === 0)
                throw new Error("User not found");
            const isMatch = yield runtime_1.default.compareHash(password, user.password);
            if (!isMatch)
                throw new Error("Invalid credentials");
            const token = jsonwebtoken_1.default.sign({ id: process.env.HIDE_USERID ? null : user.id, username: user.username }, this.jwtSecret, { expiresIn: "7d" });
            return token;
        });
    }
    /**
     * Verify a JWT token. Does not interact with the database to make the verification faster.
     * @param {string} token - The JWT token to verify.
     * @throws {Error} - If the token is invalid.
     * @example
     * const decoded = userHandler.verifyToken('your_jwt_token');
     */
    verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.jwtSecret);
            return decoded;
        }
        catch (err) {
            throw new Error("Invalid token");
        }
    }
}
exports.default = new UserHandler();
