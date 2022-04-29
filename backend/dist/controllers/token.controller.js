"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const utils_1 = require("../utils");
const models_1 = require("../models");
dotenv.config();
// Fazer mais testes
class Token {
    async store(req, res) {
        const { email, password, errors, } = (0, utils_1.validationUser)(req.body);
        try {
            if (errors.length > 0)
                throw new Error();
            if (email && password) {
                const { data: user, error } = await models_1.Users.read('id, name, email, password', { email });
                if ((0, utils_1.checkErrorInDB)(error, errors).length > 0)
                    throw new Error();
                if (!user || user?.length === 0) {
                    return res.status(406).json({
                        errors: ['Usuário não existe'],
                    });
                }
                const passwordHash = user[0].password;
                if (!(await (0, utils_1.passwordIsValid)(password, passwordHash))) {
                    return res.status(406).json({
                        errors: ['Senha inválida'],
                    });
                }
                const { id } = user[0];
                const { name } = user[0];
                const token = jsonwebtoken_1.default.sign({ id, email, name }, process.env.TOKEN_SECRET, {
                    expiresIn: process.env.TOKEN_EXPIRATION,
                });
                return res.json({
                    token,
                    user: {
                        id, email, name,
                    },
                });
            }
            return res.json({
                errors: [
                    'Credenciais inválidas',
                ],
            });
        }
        catch (error) {
            return res.status(400).json({
                errors,
                error,
            });
        }
    }
}
exports.default = new Token();
//# sourceMappingURL=token.controller.js.map