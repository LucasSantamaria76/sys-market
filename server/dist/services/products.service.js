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
exports.ProductsService = {
    create: (prod, providerID) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
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
    }),
    getProductsByProvider: (providerID) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
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
            const listProducts = (_b = data === null || data === void 0 ? void 0 : data.products) === null || _b === void 0 ? void 0 : _b.reduce((acc, act) => (acc = [
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
                fields: (_c = error.meta) === null || _c === void 0 ? void 0 : _c.target,
            };
        }
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
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
                fields: (_d = error.meta) === null || _d === void 0 ? void 0 : _d.target,
            };
        }
    }),
    getByBarcode: (barcode) => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
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
                fields: (_e = error.meta) === null || _e === void 0 ? void 0 : _e.target,
            };
        }
    }),
    update: (barcode, prod) => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
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
                fields: (_f = error.meta) === null || _f === void 0 ? void 0 : _f.target,
            };
        }
    }),
    updateStock: (barcode, isReduce, quantity) => __awaiter(void 0, void 0, void 0, function* () {
        var _g;
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
                fields: (_g = error.meta) === null || _g === void 0 ? void 0 : _g.target,
            };
        }
    }),
    delete: (barcode) => __awaiter(void 0, void 0, void 0, function* () {
        var _h;
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
                fields: (_h = error.meta) === null || _h === void 0 ? void 0 : _h.target,
            };
        }
    }),
};
