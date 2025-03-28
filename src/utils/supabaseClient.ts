// src/supabaseClient.js
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qwavtzetbprvtrbiopow.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3YXZ0emV0YnBydnRyYmlvcG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMTg2MzMsImV4cCI6MjA1NjY5NDYzM30.1RMh1ZVeFeaaRGF5ayRUn0GQvXjH9qKQDvxpkvgRyo4'; // Replace with your Supabase public key

// Explicitly type the supabase client
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };