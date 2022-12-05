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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvidersService = void 0;
const __1 = require("..");
const error_1 = require("../constants/error");
class ProvidersService {
    constructor() { }
    static create(prov) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provider = yield __1.prisma.providers.create({
                    data: Object.assign({}, prov),
                });
                return provider;
            }
            catch (error) {
                return { error: error_1.ERROR_CODES[error.code], fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target };
            }
        });
    }
    static getAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providers = yield __1.prisma.providers.findMany({
                    include: {
                        products: {},
                    },
                });
                return providers;
            }
            catch (error) {
                return { error: error_1.ERROR_CODES[error.code], fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target };
            }
        });
    }
    static getById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provider = yield __1.prisma.providers.findUnique({
                    where: { id },
                    include: {
                        products: {},
                    },
                });
                return provider;
            }
            catch (error) {
                return { error: error_1.ERROR_CODES[error.code], fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target };
            }
        });
    }
    static update(id, prov) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield __1.prisma.providers.update({
                    where: { id },
                    data: Object.assign({}, prov),
                });
                return result;
            }
            catch (error) {
                return { error: error_1.ERROR_CODES[error.code], fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target };
            }
        });
    }
    static addProduct(id, prod) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield __1.prisma.providers.update({
                    where: { id },
                    data: {
                        products: {
                            create: [
                                {
                                    price_cost: prod.cost,
                                    product: {
                                        connect: {
                                            barcode: prod.barcode,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                });
                return result;
            }
            catch (error) {
                return { error: error_1.ERROR_CODES[error.code], fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target };
            }
        });
    }
    static delete(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield __1.prisma.providers.delete({
                    where: { id },
                });
                return result;
            }
            catch (error) {
                return { error: error_1.ERROR_CODES[error.code], fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target };
            }
        });
    }
}
exports.ProvidersService = ProvidersService;
