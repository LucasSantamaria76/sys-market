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
exports.UserService = void 0;
const __1 = require("..");
const error_1 = require("./../constants/error");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() { }
    static create(userData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield __1.prisma.user.create({
                    data: Object.assign({}, userData),
                    select: {
                        id: true,
                        userName: true,
                        role: true,
                    },
                });
                return { success: true, user };
            }
            catch (error) {
                console.log('error: ', error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al crear el usuario',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static getAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield __1.prisma.user.findMany({
                    select: {
                        id: true,
                        userName: true,
                        role: true,
                    },
                });
                return { success: true, users };
            }
            catch (error) {
                console.log('error: ', error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al recuperar los usuarios',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static getByUserName(userName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield __1.prisma.user.findUniqueOrThrow({ where: { userName } });
                return { success: true, user };
            }
            catch (error) {
                console.log('error: ', error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Usuario no encontrado',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static delete(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield __1.prisma.user.delete({ where: { id } });
                return { success: true, res };
            }
            catch (error) {
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Usuario no encontrado',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static update({ userName, password }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const data = yield __1.prisma.user.update({
                    where: { userName },
                    data: {
                        password: hashedPassword,
                    },
                });
                return { success: true, data };
            }
            catch (error) {
                console.log('error: ', error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Usuario no encontrado',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
}
exports.UserService = UserService;
