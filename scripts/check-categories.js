require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: cat } = await supabase.from('categories').select('*');
  const { data: sub } = await supabase.from('subcategories').select('*');
  console.log('Categories:', cat);
  console.log('Subcategories:', sub);
}
check();
