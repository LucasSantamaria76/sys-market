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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const products_service_1 = require("../services/products.service");
exports.ProductsController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = req.body, { providerID } = _a, prod = __rest(_a, ["providerID"]);
        const data = yield products_service_1.ProductsService.create(prod, providerID);
        res.status((data === null || data === void 0 ? void 0 : data.success) ? 200 : 400).send(data);
    }),
    getProductsByProvider: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { providerID } = req.query;
        let data;
        if (providerID)
            data = yield products_service_1.ProductsService.getProductsByProvider(+providerID);
        res.status((data === null || data === void 0 ? void 0 : data.success) ? 200 : 404).send(data);
    }),
    getAll: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield products_service_1.ProductsService.getAll();
        res.status(200).send(data);
    }),
    getByBarcode: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield products_service_1.ProductsService.getByBarcode(req.params.barcode);
        res.status(200).send(data);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { barcode } = req.params;
        const data = yield products_service_1.ProductsService.update(barcode, req.body);
        res.status(200).send(data);
    }),
    updateStock: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { isReduce, quantity } = req.body;
        const data = yield products_service_1.ProductsService.updateStock(req.params.id, isReduce, quantity);
        res.status(200).send(data);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield products_service_1.ProductsService.delete(req.params.barcode);
        res.status(200).send(data);
    }),
};
