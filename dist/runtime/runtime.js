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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs_1 = require("fs");
const runtime = {
    /**
     * Hashes an inputted string
     * @param {string} input
     * @param {number} iterations
     * @returns {Promise<string>} hashed input
     */
    hash(input, iterations) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.hash(input, iterations);
        });
    },
    /**
     * Compares a given string value to a given hash
     * @param {string} s
     * @param {string} hash
     * @returns {Promise<boolean>} matches
     */
    compareHash(s, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(s, hash);
        });
    },
    /**
     * Reads in a file asynchronously as text
     * @param {string} filepath
     * @returns {Promise<string>} file contents
     */
    readFileString(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fs_1.promises.readFile(filepath, "utf-8");
        });
    },
};
exports.default = runtime;
