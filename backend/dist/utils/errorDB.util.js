"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkErrorInDB = void 0;
function checkErrorInDB(error, errors) {
    if (error && !Array.isArray(error)) {
        switch (error?.code) {
            case '23505':
                if (error.details.includes('name'))
                    errors.push('Nome já existe');
                if (error.details.includes('email'))
                    errors.push('Email já existe');
                return errors;
            default:
                errors.push(error);
                return errors;
        }
    }
    return [];
}
exports.checkErrorInDB = checkErrorInDB;
//# sourceMappingURL=errorDB.util.js.map