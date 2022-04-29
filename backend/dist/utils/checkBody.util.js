"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyExists = void 0;
function bodyExists(req) {
    return Object.keys(req.body).length === 0;
}
exports.bodyExists = bodyExists;
//# sourceMappingURL=checkBody.util.js.map