"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
require('dotenv').config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
exports.default = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
//# sourceMappingURL=supabase.js.map