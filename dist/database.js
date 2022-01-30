"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, DB_HOST = _a.DB_HOST, DB_NAME = _a.DB_NAME, DB_TEST_NAME = _a.DB_TEST_NAME, DB_USER = _a.DB_USER, DB_PASSWORD = _a.DB_PASSWORD, DB_PORT = _a.DB_PORT, ENV = _a.ENV;
var clientOptions = {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT, 10)
};
if (ENV === 'test') {
    clientOptions.database = DB_TEST_NAME;
}
var client = new pg_1.Pool(clientOptions);
exports["default"] = client;
// import dotenv from 'dotenv'
// import { Pool } from 'pg'
// dotenv.config()
// const {
//   POSTGRES_HOST,
//   POSTGRES_DB,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_TEST_DB,
//   ENV,
// } = process.env
// let client
// console.log(ENV)
// if(ENV === 'test') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//   })
// }
// if(ENV === 'dev') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_TEST_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//   })
// }
// export default client
