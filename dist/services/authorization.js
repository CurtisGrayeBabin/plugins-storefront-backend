"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var tokenSecret = TOKEN_SECRET;
// code used from Lesson 5.10 section Making a custom Express middleware
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        //const decoded = jwt.verify(token, tokenSecret);
        var decoded = jsonwebtoken_1["default"].verify(token, tokenSecret);
        // token was successfully verified...
        if (decoded) {
            // on to an authorization-needed action on the database
            next();
        }
        else {
            // token was not verified
            res.sendStatus(401);
        }
    }
    catch (error) {
        console.log("There was an error validating authorization: " + error);
        res.sendStatus(401);
    }
};
exports["default"] = verifyAuthToken;
