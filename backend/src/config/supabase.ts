import { createClient } from '@supabase/supabase-js';

require('dotenv').config();

const supabaseUrl = <string>process.env.SUPABASE_URL;
const supabaseKey = <string>process.env.SUPABASE_KEY;
export default createClient(supabaseUrl, supabaseKey);
