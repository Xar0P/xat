"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationUser = void 0;
const validator_1 = __importDefault(require("validator"));
function validationUser({ name, email, password }) {
    const errors = [];
    if (name) {
        if (!validator_1.default.isLength(name, { min: 5, max: 60 })) {
            errors.push('Nome deve ter entre 5 e 60 caracteres!');
        }
    }
    if (email) {
        if (!validator_1.default.isEmail(email)) {
            errors.push('Email inválido!');
        }
        if (!validator_1.default.isLength(email, { min: undefined, max: 254 })) {
            errors.push('Email está grande demais não acha?');
        }
    }
    if (password) {
        if (!validator_1.default.isLength(password, { min: 6, max: undefined })) {
            errors.push('Senha deve ter no mínimo 6 caracteres!');
        }
    }
    return {
        name, email, password, errors,
    };
}
exports.validationUser = validationUser;
//# sourceMappingURL=validation.util.js.map