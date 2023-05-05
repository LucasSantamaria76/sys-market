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
exports.SalesService = void 0;
const __1 = require("..");
const error_1 = require("../constants/error");
const dayjs_1 = __importDefault(require("dayjs"));
exports.SalesService = {
    create: (paymentMethod, total, items) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const sale = yield __1.prisma.sale.create({
                data: {
                    total,
                    paymentMethod,
                    date: (0, dayjs_1.default)().toDate().toISOString(),
                    items: {
                        create: items.map(({ quantity, price, barcode }) => ({
                            quantity,
                            price,
                            product: {
                                connect: {
                                    barcode,
                                },
                            },
                        })),
                    },
                },
            });
            return { success: true, sale };
        }
        catch (error) {
            console.log({ error });
            return {
                sucess: false,
                error: error_1.ERROR_CODES[error.code] || 'Hubo un error al crear el producto',
                fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
            };
        }
    }),
    getAll: (date) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const dateFormat = (0, dayjs_1.default)(date).toDate().toISOString();
        const dateFilter = date
            ? {
                date: {
                    equals: dateFormat,
                },
            }
            : {};
        try {
            const sales = yield __1.prisma.sale.findMany({
                where: dateFilter,
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    photoURL: true,
                                    description: true,
                                },
                            },
                        },
                    },
                },
            });
            return { success: true, sales };
        }
        catch (error) {
            console.log({ error });
            return {
                success: false,
                error: error_1.ERROR_CODES[error.code] || 'Hubo un error al recuperar las ventas',
                fields: (_b = error.meta) === null || _b === void 0 ? void 0 : _b.target,
            };
        }
    }),
};
