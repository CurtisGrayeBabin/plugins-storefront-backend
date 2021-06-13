"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
// init environment variables
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
var db = (ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB);
var client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: db,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports["default"] = client;
