import { createClient } from '@supabase/supabase-js';

// Hardcoded keys for immediate fix
const supabaseUrl = 'https://fqejxmnxugsbnhrpxunv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZWp4bW54dWdzbmhocnB4dW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDAyNjEsImV4cCI6MjA5Mjk3NjI2MX0.ealSd7lS2t4HEzea22amoPHIbeaThoN6vviYtDcwupg';

// Client creation
export const supabase = createClient(supabaseUrl, supabaseAnonKey);