"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordIsValid = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function passwordIsValid(password, passwordHash) {
    return bcryptjs_1.default.compare(password, passwordHash);
}
exports.passwordIsValid = passwordIsValid;
//# sourceMappingURL=checkPassword.util.js.map