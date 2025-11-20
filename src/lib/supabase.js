import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ykypriejswpuzxrkkeoi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreXByaWVqc3dwdXp4cmtrZW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MTA3MDUsImV4cCI6MjA3OTE4NjcwNX0.53bt1V8W1E8rONht9rxulVUJKDpXORi9gvJtVVsBy-o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
