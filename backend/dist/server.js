"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// eslint-disable-next-line no-console
app_1.default.listen(3333, () => console.log('Listening on http://localhost:3333'));
//# sourceMappingURL=server.js.map