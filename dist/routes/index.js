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
const db_1 = __importDefault(require("../db/db"));
const router = express_1.default.Router();
// Routes in this files are protected with the authenticate middleware
/*
    curl -X GET http://localhost:5005/api/protected \
    -H "Authorization: Bearer <token>"
*/
router.get("/protected", (req, res) => {
    // @ts-ignore
    res.json({ message: "This is a protected route", user: req.user });
});
/*
    curl -X GET http://localhost:5005/api/rows/users \
    -H "Authorization: Bearer <token>"
*/
router.get("/rows/:table", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rows = yield db_1.default.functions.getRows(req.params.table);
        res.json(rows);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
/*
    curl -X GET http://localhost:5005/api/row/users?id=1
    -H "Authorization: Bearer <token>"
*/
router.get("/row/:table", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selector = req.query;
        const row = yield db_1.default.functions.getRow(req.params.table, selector);
        res.json(row);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
/*
    curl -X PUT http://localhost:5005/api/row/users \
    -H "Content-Type: application/json" \
    -d '{"data": {"username": "John Doe"}, "selector": {"id": 1}}'
    -H "Authorization Bearer <token>"
*/
router.put("/row/:table", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.data;
        const selector = req.body.selector;
        const result = yield db_1.default.functions.updateRow(req.params.table, data, selector);
        res.json(result);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
