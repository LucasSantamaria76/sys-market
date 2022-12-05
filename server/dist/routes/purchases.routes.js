"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const purchases_controllers_1 = require("./../controllers/purchases.controllers");
const router = (0, express_1.Router)();
router.use(middleware_1.verifyToken);
router.route('/').get(purchases_controllers_1.PurchasesControllers.getAll).post(purchases_controllers_1.PurchasesControllers.create);
exports.default = router;
