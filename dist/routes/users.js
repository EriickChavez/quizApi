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
const express_1 = __importDefault(require("express"));
const userHandler_1 = __importDefault(require("../classes/userHandler"));
const router = express_1.default.Router();
/**
 * curl -X POST http://localhost:5005/users/register \
 * -H "Content-Type: application/json" \
 * -d '{
 *     "username": "testuser",
 *     "password": "testpassword"
 * }'
 */
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const token = yield userHandler_1.default.registerUser(username, password);
        res.status(201).json({ message: "User registered successfully", token });
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
/**
 * curl -X POST http://localhost:5005/users/login \
 * -H "Content-Type: application/json" \
 * -d '{
 *     "username": "testuser",
 *     "password": "testpassword"
 * }'
 */
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const token = yield userHandler_1.default.loginUser(username, password);
        res.json({ token });
    }
    catch (error) {
        // @ts-ignore
        res.status(401).json({ error: error.message });
    }
}));
exports.default = router;
