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
exports.verifyToken = exports.verifyPassword = void 0;
const user_service_1 = require("../services/user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../constants/error");
const verifyPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { password, userName } = req.body;
    const data = yield user_service_1.UserService.getByUserName(userName);
    if (!data.success) {
        res.status(404).send(data);
        return;
    }
    const matchPassword = yield bcrypt_1.default.compare(password, ((_a = data.user) === null || _a === void 0 ? void 0 : _a.password) || '');
    if (!matchPassword) {
        res.status(401).send({ success: false, error: 'Password inválido' });
        return;
    }
    //@ts-ignore
    req.user = {
        userName: (_b = data.user) === null || _b === void 0 ? void 0 : _b.userName,
        role: (_c = data.user) === null || _c === void 0 ? void 0 : _c.role,
    };
    next();
});
exports.verifyPassword = verifyPassword;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const isBearer = authorization === null || authorization === void 0 ? void 0 : authorization.startsWith('Bearer');
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
    const SECRET = process.env.SECRET;
    try {
        if (!isBearer && !token)
            throw new Error('Unauthorized');
        jsonwebtoken_1.default.verify(token, SECRET);
        next();
    }
    catch (error) {
        console.log(error_1.ERROR_TOKEN[error.name][error.message]);
        next({ success: false, error: error_1.ERROR_TOKEN[error.name][error.message] });
    }
});
exports.verifyToken = verifyToken;
