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
exports.PurchasesControllers = void 0;
const purchases_service_1 = require("../services/purchases.service");
exports.PurchasesControllers = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield purchases_service_1.PurchasesService.create(req.body);
        res.status(data.success ? 201 : 400).send(data);
    }),
    getAll: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield purchases_service_1.PurchasesService.getAll();
        res.status(data.success ? 200 : 404).send(data);
    }),
};
