"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const router = express_1.default.Router();
const userSchema = joi_1.default.object({
    username: joi_1.default.string().min(6).required(),
});
// curl -X POST http://localhost:5005/validation/username
router.post("/username", (req, res) => {
    const { error } = userSchema.validate(req.body); // req.body structure: { username: 'john' }
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }
    res.json({ message: "Username is valid" });
});
exports.default = router;
