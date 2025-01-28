"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../logger"));
const router = express_1.default.Router();
// curl -X GET http://localhost:5005/api/logger
router.get("/", (req, res) => {
    logger_1.default.info("GET /log");
    res.json({ message: "The request has been logged in combined.log" });
});
exports.default = router;
