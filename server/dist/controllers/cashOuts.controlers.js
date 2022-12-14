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
exports.CashOutsControler = void 0;
const cashOuts_service_1 = require("./../services/cashOuts.service");
exports.CashOutsControler = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield cashOuts_service_1.CashOutsService.create(req.body);
        res.status(data.success ? 201 : 400).send(data);
    }),
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield cashOuts_service_1.CashOutsService.getAll();
        res.status(data.success ? 200 : 400).send(data);
    }),
    getTotalPerDay: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield cashOuts_service_1.CashOutsService.getTotalPerDay();
        res.status(data.success ? 200 : 400).send(data);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield cashOuts_service_1.CashOutsService.update(req.params.id, req.body);
        res.status(data.success ? 200 : 400).send(data);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield cashOuts_service_1.CashOutsService.delete(req.params.id);
        res.status(data.success ? 200 : 400).send(data);
    }),
};
