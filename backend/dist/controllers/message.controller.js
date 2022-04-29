"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
class Message {
    async store(req, res) {
        const errors = [];
        try {
            if ((0, utils_1.bodyExists)(req)) {
                return res.status(400).json({
                    errors: ['Corpo da requisição não foi encontrado!'],
                });
            }
            const { id, message, senderID, receiver, date, } = req.body;
            const { data, error } = await models_1.Messages.create({
                id,
                message,
                senderID,
                receiver,
                date,
            });
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
    async show(req, res) {
        const errors = [];
        try {
            if ((0, utils_1.bodyExists)(req)) {
                return res.status(400).json({
                    errors: ['Corpo da requisição não foi encontrado!'],
                });
            }
            const { friendID, userID, } = req.body;
            const { data, error } = await models_1.Messages.read('id, message, sender, receiver, date', 'sender', [userID, friendID], 'receiver', [userID, friendID]);
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
}
exports.default = new Message();
//# sourceMappingURL=message.controller.js.map