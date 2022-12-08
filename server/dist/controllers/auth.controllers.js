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
exports.ControllerAuth = void 0;
const auth_service_1 = require("./../services/auth.service");
exports.ControllerAuth = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield auth_service_1.AuthService.register(req.body);
        res.status(data.success ? 201 : 401).send(data);
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const { userName, role } = req.user;
        const token = yield auth_service_1.AuthService.login(userName);
        res.status(200).send({ success: true, user: { userName, role, token } });
    }),
};
