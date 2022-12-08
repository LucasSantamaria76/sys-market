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
exports.UsersControllers = void 0;
const user_service_1 = require("./../services/user.service");
exports.UsersControllers = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield user_service_1.UserService.getAll();
        res.status(data.success ? 200 : 404).send(data.users);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield user_service_1.UserService.delete(+req.params.id);
        res.status(data.success ? 200 : 404).send(data);
    }),
    changePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userName, password, newPassword } = req.body;
        const data = yield user_service_1.UserService.changePassword({ userName, password: newPassword });
        res.status(data.success ? 200 : 404).send(data);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield user_service_1.UserService.update(+id, req.body);
        res.status(data.success ? 200 : 404).send(data);
    }),
};
