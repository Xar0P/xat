"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Token = exports.User = void 0;
var user_controller_1 = require("./user.controller");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(user_controller_1).default; } });
var token_controller_1 = require("./token.controller");
Object.defineProperty(exports, "Token", { enumerable: true, get: function () { return __importDefault(token_controller_1).default; } });
var message_controller_1 = require("./message.controller");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return __importDefault(message_controller_1).default; } });
//# sourceMappingURL=index.js.map