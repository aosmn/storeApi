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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not get orders. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.indexByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders WHERE user_id = ($1)';
                        return [4 /*yield*/, conn.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not get orders. Error: ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.indexCompleteByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
                        return [4 /*yield*/, conn.query(sql, [userId, 'complete'])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not get orders. Error: ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'INSERT INTO orders (user_id, status, id) VALUES($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [o.user_id, o.status, o.id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not add new order. Error: ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addProduct = function (quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersql, conn, result, order, err_6, sql, conn, result, order, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        ordersql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(ordersql, [orderId])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        if (!order) {
                            throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, " because order doesn't exist"));
                        }
                        if (order.status !== 'active') {
                            throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, " because order status is ").concat(order.status));
                        }
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("".concat(err_6));
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 5:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [quantity, orderId, productId])];
                    case 6:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 7:
                        err_7 = _a.sent();
                        throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, ": ").concat(err_7));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.showOrderProducts = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT name, category, price, quantity, product_id, order_id FROM products\n                   INNER JOIN order_products\n                   ON products.id = order_products.id\n                   WHERE order_id=($1)\n                  ";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". Error: ").concat(err_8));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.deleteOrderProduct = function (orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, orderProduct, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM order_products WHERE order_id=($1) AND product_id=($2)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [orderId, productId])];
                    case 2:
                        result = _a.sent();
                        orderProduct = result.rows[0];
                        conn.release();
                        return [2 /*return*/, orderProduct];
                    case 3:
                        err_9 = _a.sent();
                        throw new Error("Could not delete product ".concat(productId, " from order ").concat(productId, ". Error: ").concat(err_9));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, order, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_10 = _a.sent();
                        throw new Error("Could not delete order ".concat(id, ". Error: ").concat(err_10));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
