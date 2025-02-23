import { createClient } from '@supabase/supabase-js';

// Get these values from your Supabase Dashboard
const SUPABASE_URL = 'https://gudsmtfnwebxcpebyxdm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZHNtdGZud2VieGNwZWJ5eGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMzYzMjMsImV4cCI6MjA1NDYxMjMyM30.ath61hh2COVJVvHQ5T03on_RjPGIFlIj0fbfLCuFfDI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);