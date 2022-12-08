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
exports.ProvidersController = void 0;
const provider_service_1 = require("./../services/provider.service");
exports.ProvidersController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield provider_service_1.ProvidersService.create(req.body);
        res.status(201).send(data);
    }),
    getAll: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield provider_service_1.ProvidersService.getAll();
        res.status(200).send(data);
    }),
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield provider_service_1.ProvidersService.getById(+id);
        res.status(200).send(data);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield provider_service_1.ProvidersService.update(+id, req.body);
        res.status(200).send(data);
    }),
    addProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield provider_service_1.ProvidersService.addProduct(+id, req.body);
        res.status(200).send(data);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield provider_service_1.ProvidersService.delete(+req.params.id);
        res.status(200).send(data);
    }),
};
