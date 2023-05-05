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
exports.CashOutsService = {
    create: ({ amount, description, date }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
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
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const data = yield __1.prisma.cashOuts.findMany({});
            return { success: true, data };
        }
        catch (error) {
            console.log('error: ', error);
            return {
                success: false,
                error: error_1.ERROR_CODES[error.code] || 'Hubo un error al hacer la consulta',
                fields: (_b = error.meta) === null || _b === void 0 ? void 0 : _b.target,
            };
        }
    }),
    getTotalPerDay: () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
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
                fields: (_c = error.meta) === null || _c === void 0 ? void 0 : _c.target,
            };
        }
    }),
    update: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
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
                flields: (_d = error.meta) === null || _d === void 0 ? void 0 : _d.target,
            };
        }
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        try {
            const data = yield __1.prisma.cashOuts.delete({ where: { id } });
            console.log(data);
            return { success: true, data };
        }
        catch (error) {
            return {
                success: false,
                error: error_1.ERROR_CODES[error === null || error === void 0 ? void 0 : error.code] || 'Hubo un error al eliminar la salida',
                fields: (_e = error.meta) === null || _e === void 0 ? void 0 : _e.target,
            };
        }
    }),
};
