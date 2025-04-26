import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jrngdlrdiopfqadvucvy.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpybmdkbHJkaW9wZnFhZHZ1Y3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MzA5MTgsImV4cCI6MjA2MTIwNjkxOH0.GoFpmoLN-NppuTc5jxIDomJNLERPPEIDTTEVZO49Wos';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
