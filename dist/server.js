"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var plugins_1 = __importDefault(require("./handlers/plugins"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
var dashboardHandler_1 = __importDefault(require("./services/dashboardHandler"));
var app = express_1["default"]();
var address = "0.0.0.0:3000";
app.use(cors_1["default"]());
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
plugins_1["default"](app);
users_1["default"](app);
orders_1["default"](app);
dashboardHandler_1["default"](app);
app.listen(3000, function () {
    console.log("starting app on: " + address);
});
exports["default"] = app;
