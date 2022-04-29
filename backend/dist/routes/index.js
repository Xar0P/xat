"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Token = exports.User = void 0;
var user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(user_routes_1).default; } });
var token_routes_1 = require("./token.routes");
Object.defineProperty(exports, "Token", { enumerable: true, get: function () { return __importDefault(token_routes_1).default; } });
var message_routes_1 = require("./message.routes");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return __importDefault(message_routes_1).default; } });
//# sourceMappingURL=index.js.map