import { createClient } from '@supabase/supabase-js';

// Credentials provided by user
const supabaseUrl = 'https://kfhegcfkhhqggdvvunod.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFub24iLCJpYXQiOjE3NzAzOTk1MzQsImV4cCI6MjA4NTk3NTUzNH0.w7vcKw7API3tYC_EZSo1Fzz28pYo3_7EF6X_zZ_x5RM';

export const supabase = createClient(supabaseUrl, supabaseKey);
