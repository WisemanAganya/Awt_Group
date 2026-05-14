
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLogo() {
  const { data, error } = await supabase
    .from('system_settings')
    .select('*')
    .eq('key', 'site_logo')
    .single();

  if (error) {
    console.error('Error fetching logo:', error.message);
  } else {
    console.log('Current site_logo in DB:', data.value);
  }
}

checkLogo();
