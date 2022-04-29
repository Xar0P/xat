"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utils");
const models_1 = require("../models");
class User {
    async index(req, res) {
        const errors = [];
        try {
            const { data, error } = await models_1.Users.readAll();
            if ((0, utils_1.checkErrorInDB)(error, errors).length > 0)
                throw new Error();
            return res.json({
                data,
            });
        }
        catch (error) {
            return res.status(400).json({
                error,
            });
        }
    }
    async show(req, res) {
        const errors = [];
        try {
            const { id } = req.params;
            const { data, error } = await models_1.Users.read('name, email, created_at', { id: Number(id) });
            if ((0, utils_1.checkErrorInDB)(error, errors).length > 0)
                throw new Error();
            return res.json({
                data,
            });
        }
        catch (error) {
            return res.status(400).json({
                errors,
                error,
            });
        }
    }
    async store(req, res) {
        const { name, email, password, errors, } = (0, utils_1.validationUser)(req.body);
        try {
            if (errors.length > 0)
                throw new Error();
            if (name && email && password) {
                const salt = await bcryptjs_1.default.genSalt();
                const passwordHash = bcryptjs_1.default.hashSync(password, salt);
                // Criando na DB
                const { data, error } = await models_1.Users.create({
                    name,
                    email,
                    password: passwordHash,
                });
                if ((0, utils_1.checkErrorInDB)(error, errors).length > 0)
                    throw new Error();
                return res.json({
                    data,
                });
            }
            return res.json({
                errors: [
                    'Algum dos valores é inexistente',
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
    async update(req, res) {
        if ((0, utils_1.bodyExists)(req)) {
            return res.status(400).json({
                errors: ['Corpo da requisição não foi encontrado!'],
            });
        }
        const { name, email, errors, } = (0, utils_1.validationUser)(req.body);
        const { id } = req.params;
        try {
            if (errors.length > 0)
                throw new Error();
            const { data, error } = await models_1.Users.update({
                name,
                email,
            }, { id: Number(id) });
            if ((0, utils_1.checkErrorInDB)(error, errors).length > 0)
                throw new Error();
            if (!data) {
                return res.status(400).json({
                    errors: ['Usuário não existe'],
                });
            }
            return res.json({
                data,
            });
        }
        catch (error) {
            return res.status(400).json({
                errors,
                error,
            });
        }
    }
    async deleteUser(req, res) {
        const errors = [];
        const { id } = req.params;
        try {
            const { data, error } = await models_1.Users.delete({ id: Number(id) });
            if ((0, utils_1.checkErrorInDB)(error, errors).length > 0)
                throw new Error();
            if (data?.length === 0) {
                return res.status(400).json({
                    errors: ['Usuário não existe'],
                });
            }
            return res.json({
                data,
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
exports.default = new User();
//# sourceMappingURL=user.controller.js.map