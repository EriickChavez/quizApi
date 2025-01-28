"use strict";
//reads env vars and decides which database to use
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = process.env.DBTYPE === "postgres"
    ? require("postgres")
    : require("mysql2");
