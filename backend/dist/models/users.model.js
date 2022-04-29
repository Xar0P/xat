"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = __importDefault(require("../config/supabase"));
class Users {
    async create(user) {
        const { data, error } = await supabase_1.default
            .from('users')
            .insert([
            {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        ]);
        return { data, error };
    }
    async read(columns, query) {
        const { data, error } = await supabase_1.default
            .from('users')
            .select(columns)
            .match(query);
        return { data, error };
    }
    async readAll() {
        const { data, error } = await supabase_1.default
            .from('users')
            .select('*');
        return { data, error };
    }
    async update(newUser, query) {
        const { data, error } = await supabase_1.default
            .from('users')
            .update(newUser)
            .match(query);
        return { data, error };
    }
    async delete(query) {
        const { data, error } = await supabase_1.default
            .from('users')
            .delete()
            .match(query);
        return { data, error };
    }
}
exports.default = new Users();
//# sourceMappingURL=users.model.js.map