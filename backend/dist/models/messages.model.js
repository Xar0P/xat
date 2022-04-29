"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = __importDefault(require("../config/supabase"));
class Messages {
    async create(message) {
        const { data, error } = await supabase_1.default
            .from('messages')
            .insert([
            {
                id: message.id,
                message: message.message,
                sender: message.senderID,
                receiver: message.receiver,
                date: message.date,
            },
        ]);
        return { data, error };
    }
    async read(columns, column1, value1, column2, value2) {
        const { data, error } = await supabase_1.default
            .from('messages')
            .select(columns)
            .in(column1, value1)
            .in(column2, value2);
        return { data, error };
    }
    async readAll() {
        const { data, error } = await supabase_1.default
            .from('messages')
            .select('*');
        return { data, error };
    }
    async update(newMessage, query) {
        const { data, error } = await supabase_1.default
            .from('messages')
            .update(newMessage)
            .match(query);
        return { data, error };
    }
    async delete(query) {
        const { data, error } = await supabase_1.default
            .from('messages')
            .delete()
            .match(query);
        return { data, error };
    }
}
exports.default = new Messages();
//# sourceMappingURL=messages.model.js.map