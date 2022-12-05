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
exports.CashOutsService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const __1 = require("..");
const error_1 = require("../constants/error");
class CashOutsService {
    constructor() { }
    static create({ amount, description, date }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.cashOuts.create({
                    data: {
                        amount,
                        description,
                        date: date || (0, dayjs_1.default)().format('DD-MM-YYYY'),
                    },
                });
                return { success: true, data };
            }
            catch (error) {
                console.log('error: ', error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al crear la salida de caja',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static getAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.cashOuts.findMany({});
                return { success: true, data };
            }
            catch (error) {
                console.log('error: ', error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al hacer la consulta',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static getTotalPerDay() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.cashOuts.groupBy({
                    by: ['date'],
                    _sum: {
                        amount: true,
                    },
                });
                return { success: true, data };
            }
            catch (error) {
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al hacer la consulta',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static update(id, body) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.cashOuts.update({
                    where: { id },
                    data: Object.assign({}, body),
                });
                console.log(data);
                return { success: true, data };
            }
            catch (error) {
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al actualizar la consulta',
                    flields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static delete(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.cashOuts.delete({ where: { id } });
                console.log(data);
                return { success: true, data };
            }
            catch (error) {
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error === null || error === void 0 ? void 0 : error.code] || 'Hubo un error al eliminar la salida',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
}
exports.CashOutsService = CashOutsService;
