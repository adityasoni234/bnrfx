import { createClient } from '@supabase/supabase-js'

// Use environment variables with fallbacks
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://exuyvavqbohnrrwwradm.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dXl2YXZxYm9obnJyd3dyYWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDcyNDgsImV4cCI6MjA4MzI4MzI0OH0.b0zVASIUEHaHEt_VrnBjIYQ7LRsyy_iE_vNjRqB9GKs'

console.log('🔧 Supabase Client Configuration:')
console.log('Environment:', process.env.NODE_ENV || 'development')
console.log('URL:', supabaseUrl)
console.log('Anon Key:', supabaseAnonKey ? '✓ Exists' : '✗ Missing')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  }
})

console.log('✅ Supabase client initialized successfully')