"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.post('/register', auth_controllers_1.ControllerAuth.register);
router.post('/login', middleware_1.verifyPassword, auth_controllers_1.ControllerAuth.login);
exports.default = router;
