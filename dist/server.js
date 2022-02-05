"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var order_1 = __importDefault(require("./handlers/order"));
var user_1 = __importDefault(require("./handlers/user"));
var product_1 = __importDefault(require("./handlers/product"));
exports.app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
exports.app.use(body_parser_1["default"].json());
(0, order_1["default"])(exports.app);
(0, user_1["default"])(exports.app);
(0, product_1["default"])(exports.app);
exports.app.get('/', function (req, res) {
    res.send('Hello World!');
});
exports.app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
