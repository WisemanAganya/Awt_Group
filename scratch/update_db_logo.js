
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const urlMatch = env.match(/VITE_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : null;
const supabaseKey = keyMatch ? keyMatch[1].trim() : null;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateLogo() {
  const { error } = await supabase
    .from('system_settings')
    .upsert({
        key: 'site_logo',
        value: '/assets/img/logo.jpeg',
        updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error updating logo:', error.message);
  } else {
    console.log('Successfully updated site_logo to /assets/img/logo.jpeg');
  }
}

updateLogo();
