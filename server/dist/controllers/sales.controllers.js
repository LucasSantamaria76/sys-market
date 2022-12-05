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
exports.SalesControllers = void 0;
const sales_service_1 = require("../services/sales.service");
class SalesControllers {
    constructor() { }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { paymentMethod, total, items } = req.body;
            const data = yield sales_service_1.SalesService.create(paymentMethod, total, items);
            res.status(!(data === null || data === void 0 ? void 0 : data.error) ? 201 : 400).send(data);
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield sales_service_1.SalesService.getAll(req.query.date);
            res.status(data.success ? 200 : 404).send(data);
        });
    }
}
exports.SalesControllers = SalesControllers;
