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
exports.PurchasesService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const __1 = require("..");
const error_1 = require("./../constants/error");
const provider_service_1 = require("./provider.service");
const cashOuts_service_1 = require("./cashOuts.service");
class PurchasesService {
    constructor() { }
    static create(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { products, providerId, total, paid_purchase } = data;
            try {
                products.forEach(({ barcode, benefit, cost, quantity }) => __awaiter(this, void 0, void 0, function* () {
                    const updateProduct = __1.prisma.products.update({
                        where: { barcode },
                        data: {
                            benefit,
                            cost,
                            stock: { increment: quantity },
                            price: cost * (benefit / 100 + 1),
                        },
                    });
                    const updateProviderProduct = __1.prisma.provider_product.update({
                        where: { productID_providerID: { productID: barcode, providerID: providerId } },
                        data: {
                            price_cost: cost,
                            last_purchase: (0, dayjs_1.default)().toDate().toISOString(),
                        },
                    });
                    yield __1.prisma.$transaction([updateProduct, updateProviderProduct]);
                }));
                yield __1.prisma.purchases.create({
                    data: {
                        total,
                        paid_purchase,
                        date: (0, dayjs_1.default)().toDate().toISOString(),
                        provider: {
                            connect: { id: providerId },
                        },
                        products: {
                            //@ts-ignore
                            connect: products.map((prod) => ({ barcode: prod.barcode })),
                        },
                    },
                });
                if (paid_purchase) {
                    const { nameProvider } = yield provider_service_1.ProvidersService.getById(providerId);
                    yield cashOuts_service_1.CashOutsService.create({ description: `Pago al Proveedor: ${nameProvider}`, amount: total });
                }
                return { success: true };
            }
            catch (error) {
                console.log(error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al cargar la compra',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
    static getAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchases = yield __1.prisma.purchases.findMany({
                    include: {
                        provider: true,
                        products: true,
                    },
                });
                return { success: true, purchases };
            }
            catch (error) {
                console.log(error);
                return {
                    success: false,
                    error: error_1.ERROR_CODES[error.code] || 'Hubo un error al recuperar los datos de las compras',
                    fields: (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target,
                };
            }
        });
    }
}
exports.PurchasesService = PurchasesService;
