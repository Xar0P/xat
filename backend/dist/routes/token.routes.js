"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
const { store } = controllers_1.Token;
router.post('/', store);
exports.default = router;
//# sourceMappingURL=token.routes.js.map