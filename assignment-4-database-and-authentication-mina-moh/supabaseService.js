const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://bnhrtyigisqwtqqwugkt.supabase.co',
  'sb_publishable_CATvbRYeHUlf9cEcSY83dg_Tz1Ywmw_'
);

module.exports = { supabase };