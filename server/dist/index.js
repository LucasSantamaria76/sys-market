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
exports.prisma = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const providers_routes_1 = __importDefault(require("./routes/providers.routes"));
const sales_routes_1 = __importDefault(require("./routes/sales.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const purchases_routes_1 = __importDefault(require("./routes/purchases.routes"));
const cashOuts_routes_1 = __importDefault(require("./routes/cashOuts.routes"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.server = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
exports.server.use(express_1.default.urlencoded({ extended: false }));
exports.server.use(express_1.default.json());
exports.server.use((0, cors_1.default)());
exports.server.use((0, morgan_1.default)('dev'));
exports.server.use('/products', products_routes_1.default);
exports.server.use('/providers', providers_routes_1.default);
exports.server.use('/sales', sales_routes_1.default);
exports.server.use('/auth', auth_routes_1.default);
exports.server.use('/users', users_routes_1.default);
exports.server.use('/purchases', purchases_routes_1.default);
exports.server.use('/cashOuts', cashOuts_routes_1.default);
const PORT = process.env.PORT || 4000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        exports.server.listen(PORT);
        console.log(`server listening on port ${PORT}`);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield exports.prisma.$disconnect();
    }
});
main();
