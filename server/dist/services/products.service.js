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
exports.ProductsService = void 0;
const __1 = require("..");
const error_1 = require("../constants/error");
class ProductsService {
    constructor() { }
    static create(prod, providerID) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield __1.prisma.products.create({
                    data: Object.assign(Object.assign({}, prod), { providers: {
                            create: [
                                {
                                    price_cost: prod.cost,
                                    provider: {
                                        connect: {
                                            id: providerID,
                                        },
                                    },
                                },
                            ],
                        }, sale: {} }),
                });
                return { success: true, product };
            }
            catch (error) {
                console.log('error: ', error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al crear el producto',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static getProductsByProvider(providerID) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield __1.prisma.providers.findUnique({
                    where: { id: providerID },
                    include: {
                        products: {
                            include: {
                                product: {},
                            },
                        },
                    },
                });
                const listProducts = (_a = data === null || data === void 0 ? void 0 : data.products) === null || _a === void 0 ? void 0 : _a.reduce((acc, act) => (acc = [
                    ...acc,
                    {
                        barcode: act.productID,
                        description: act.product.description,
                        price_cost: act.price_cost,
                        last_purchase: act.last_purchase,
                        photoURL: act.product.photoURL,
                    },
                ]), []);
                return { success: true, listProducts };
            }
            catch (error) {
                console.log('error: ', error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al recuperar los productos',
                    fields: (_b = error.meta) === null || _b === void 0 ? void 0 : _b.target,
                };
            }
        });
    }
    static getAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield __1.prisma.products.findMany({
                    include: {
                        providers: {
                            include: {
                                provider: {},
                            },
                        },
                    },
                });
                return { success: true, products };
            }
            catch (error) {
                console.log(error.code);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al recuperar los productos',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static getByBarcode(barcode) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield __1.prisma.products.findUnique({
                    where: { barcode },
                    include: {
                        providers: {},
                    },
                });
                return { success: true, product };
            }
            catch (error) {
                console.log(error.code);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al recuperar el producto',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static update(barcode, prod) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield __1.prisma.products.update({
                    where: { barcode },
                    data: Object.assign({}, prod),
                });
                return { success: true, result };
            }
            catch (error) {
                console.log({ error });
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al actualizar el producto',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static updateStock(barcode, isReduce, quantity) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const operation = isReduce ? { decrement: quantity } : { increment: quantity };
            try {
                const result = yield __1.prisma.products.updateMany({
                    where: { barcode },
                    data: {
                        stock: operation,
                    },
                });
                return { success: true, result };
            }
            catch (error) {
                console.log(error.code);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al actualizar el producto',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static delete(barcode) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield __1.prisma.products.delete({
                    where: { barcode },
                });
                return { success: true, result };
            }
            catch (error) {
                console.log(error.code);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al eliminar el producto',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
}
exports.ProductsService = ProductsService;
