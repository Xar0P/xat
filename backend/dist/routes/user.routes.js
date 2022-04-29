"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
const { index, store, show, update, deleteUser, } = controllers_1.User;
router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map